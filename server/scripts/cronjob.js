import cron from 'node-cron';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PostModel from '../Schema/Posts/post.js';
import { AtpAgent } from '@atproto/api';

dotenv.config();

async function postToPlatform({ text, username, password }) {
  try {
    const agent = new AtpAgent({ service: 'https://bsky.social' });
    await agent.login({ identifier: username, password });
    await agent.post({ text, createdAt: new Date().toISOString() });
    console.log('Posted:', text);
    return true; // Indicate success
  } catch (err) {
    console.error(`Failed to post for ${username}:`, err.message);
    return false; // Indicate failure
  }
}

async function processAllPosts() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);

    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const formattedDate = now
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');

    console.log(`Checking posts scheduled at ${formattedDate} ${formattedTime}`);

    const allUsers = await PostModel.find({}).select('email post');

    for (const user of allUsers) {
      const scheduledPosts = user.post.filter(
        (p) => p.calendar === formattedDate && p.time === formattedTime
      );

      for (const post of scheduledPosts) {
        const success = await postToPlatform(post);

        if (success) {
          await PostModel.updateOne(
            { email: user.email },
            { $pull: { post: { _id: post._id } } }
          );
        } else {
          console.log(`Skipped deleting post for ${user.email} due to failure.`);
        }
      }
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error processing posts:', err.message);
  }
}

export default function startCronJob() {
  console.log('Starting global cron job...');
  cron.schedule('*/5 * * * *', () => {
    console.log('Cron triggered...');
    processAllPosts();
  });
}

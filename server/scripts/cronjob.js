import cron from 'node-cron';
import mongoose from 'mongoose';
import PostModel from '../Schema/Posts/post.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config(); 

async function processPosts(email, postToPlatform) {
  try {

    await mongoose.connect(
      'CONNECTION_STRING'
    );

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
    console.log('Email ', email);
    console.log('date', formattedDate);
    console.log('time ', formattedTime);
    
    console.log(
      `Checking for posts scheduled at ${formattedDate} ${formattedTime}...`
    );

    // Find posts that need to be posted now

    
    const postsToProcess = await PostModel.findOne()
      .where("email").equals(email)
      
      .select("post.text post.username post.password post.time post.calendar -_id")
    console.log('post dictionary array: ', postsToProcess.post);

    let postingArray=[]
    for (let i=0;i<postsToProcess.post.length;i++)
    {
      if (postsToProcess.post[i].calendar==formattedDate && postsToProcess.post[i].time==formattedTime)
      {
        postingArray.push({username: postsToProcess.post[i].username, password: postsToProcess.post[i].password, text: postsToProcess.post[i].text})
      }
    }
    
    if (!postsToProcess) {
      console.log('No posts at this time');
    }
    if (postsToProcess && postingArray.length > 0) {
      
      for (const post of postingArray) {
        

        console.log(`Posting: ${post.text}`);

        
        await postToPlatform(post);

        await PostModel.findOneAndUpdate(
          { email: postsToProcess.email }, 
          { $pull: { post: { _id: post._id } } }
        );
      }
    } else {
      console.log('No posts to process at this time.');
    }

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (error) {
    console.error('Error processing posts:', error);
  }
}

export default async function runProcess(email) {
  console.log('running process ... ');
  console.log('Email running process is: ', email);

  // Function to simulate posting to Bluesky
  async function postToPlatform(post) {
    console.log(`Sending post to platform: ${post.text}`);
    // Add API call logic to Bluesky here
  }

  // processPosts()
  // Schedule cron job to run every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    console.log('Running cron job...');
    processPosts(email, postToPlatform);
  });

  // Keep the script running
  console.log('Cron job script started.');
}



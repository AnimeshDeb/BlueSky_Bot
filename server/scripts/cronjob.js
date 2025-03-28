
import cron from 'node-cron';
import mongoose from 'mongoose';
import PostModel from '../Schema/Posts/post.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config(); // Load environment variables

// Function to process posts
async function processPosts(email) {
  
  try {
    // Connect to MongoDB

    await mongoose.connect(
      'CONNECTION_STRING'
    );

    // Get the current time formatted to match scheduled posts
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = now.toLocaleDateString('en-US',{
        month: '2-digit',
        day:'2-digit',
        year:'numeric'
    }).replace(/\//g,'-');
    console.log("Email ", email)
    console.log("date", formattedDate)
    console.log("time ", formattedTime)
    console.log(
      'type of formattedTime and date: ',
      typeof(formattedTime),
      ' ',
      typeof(formattedDate)
    );
    console.log(
      `Checking for posts scheduled at ${formattedDate} ${formattedTime}...`
    );

    // Find posts that need to be posted now
    const postsToProcess = await PostModel.find({
      email,
      "post.calendar": formattedDate,
      "post.time": formattedTime
    });
    console.log("postsToProcess ", postsToProcess)
    
    // const postsToProcess = await PostModel.findOne(
    //   {
    //     email:email,
    //     post: { $elemMatch: { "post.calendar": formattedDate, "post.time": formattedTime } },
    //   },
    //   { 'post.text': 1, 'post.username': 1, 'post.password': 1, _id: 0 }
    // );
    console.log('post dictionary array: ', postsToProcess.post);
    if (!postsToProcess){console.log("No posts at this time")}
    if (postsToProcess && postsToProcess.post.length > 0) {
      // Check if `postsToProcess` exists and has posts
      for (const post of postsToProcess.post) {
        // Iterate through the `post` array

        console.log(`Posting: ${post.text}`);

        // Call your function to post to Bluesky or another platform here
        await postToPlatform(post);

        // Remove the posted item from the database
        await PostModel.findOneAndUpdate(
          { email: postsToProcess.email }, // Use email from the main object
          { $pull: { post: { _id: post._id } } } // Remove the posted item based on _id
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
  console.log("Email running process is: ", email)

  // Function to simulate posting to Bluesky
  async function postToPlatform(post) {
    console.log(`Sending post to platform: ${post.text}`);
    // Add API call logic to Bluesky here
  }

  // processPosts()
  // Schedule cron job to run every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    console.log('Running cron job...');
    processPosts(email);
  });

  // Keep the script running
  console.log('Cron job script started.');
}


runProcess("ag@gmail.com")
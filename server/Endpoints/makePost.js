import express from 'express';
import verify from '../Middleware/verifyToken.js';
import mongoose from 'mongoose';
import PostModel from '../Schema/Posts/post.js';
import { AtpAgent } from '@atproto/api';

const router = express.Router();

router.post('/', verify, async (req, res) => {
  try {
    const { text, username, password, calendar, time } = req.body;

    if (!text || !username || !password || !calendar || !time) {
      return res.status(400).json({ data: "Missing required fields" });
    }

    const agent = new AtpAgent({ service: "https://bsky.social" });
    await agent.login({ identifier: username, password });

    await mongoose.connect(process.env.CONNECTION_STRING);
    const exists = await PostModel.exists({ email: req.user.email });

    if (exists) {
      await PostModel.findOneAndUpdate(
        { email: req.user.email },
        {
          $push: {
            post: { text, username, password, calendar, time },
          },
        }
      );
    } else {
      await PostModel.create({
        email: req.user.email,
        post: [{ text, username, password, calendar, time, script: "true" }],
      });
    }

    console.log("Post created successfully");

    return res.status(200).json({ data: "Success" });

  } catch (error) {
    console.error(error);
    return res.status(401).json({ data: "Invalid Credentials" });
  } finally {
    // Optional: Disconnect if needed — depends on how you handle DB elsewhere
    await mongoose.disconnect();
  }
});

export default router;

import express from 'express';
import verify from '../Middleware/verifyToken.js';
import mongoose from 'mongoose';
import PostModel from '../Schema/Posts/post.js';
const router = express.Router();

router.get('/', verify, async (req, res) => {
  const email = req.user.email;
  const { userID } = req.query;

  await mongoose.connect(process.env.CONNECTION_STRING);

  try {
    if (userID) {
      console.log('user id backend: ', userID);
      const messageID = new mongoose.Types.ObjectId(`${userID}`);
      const query = await PostModel.findOne(
        { email, 'post._id': messageID },
        { 'post.$': 1 }
      );
      const textField = query?.post?.[0]?.text || '';
      console.log('textField ', textField);
      if (textField.length === 0) {
        return res.json({ data: 'Empty' });
      }
      return res.json({ data: textField });
    } else {
      const query = await PostModel.findOne({ email });
      const textFields = query?.post?.map((item) => ({
        text: item.text,
        calendar: item.calendar,
        time: item.time,
        _id: item._id.toString(),
      })) || [];

      if (textFields.length === 0) {
        return res.json({ data: 'Empty' });
      }

      return res.json({ data: textFields });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await mongoose.disconnect();
  }
});

export default router;

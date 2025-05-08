import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FormData from 'form-data';
import MailGun from 'mailgun.js';
import AuthenticationModel from '../Schema/Authentication/authentication.js';
import nodemailer from 'nodemailer';
import brevo from '@getbrevo/brevo';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import VerificationCodeModel from '../Schema/VerificationCode/verificationCode.js';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  const connection = await mongoose.connect(process.env.CONNECTION_STRING);

  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  console.log(verificationCode);
  
  const codeNotExpire = await VerificationCodeModel.findOne({ email: email });

  if(codeNotExpire)
  {
    return res.json({data:"Not Expire", message:codeNotExpire.code})
  }

  if (!codeNotExpire) {
    const code = await VerificationCodeModel.create({
      email: email,
      code: verificationCode,
    });
  }

  let apiInstance = new brevo.TransactionalEmailsApi();

  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = `${process.env.BREVO_API}`;

  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = 'Reset code';
  sendSmtpEmail.htmlContent = `<html><body><h1>Here is your code: ${verificationCode}. </h1><p>This code will expire in 5 minutes.</p></body></html>`;
  sendSmtpEmail.sender = {
    name: 'bluescheduler.company',
    email: 'bluescheduler.company@gmail.com',
  };
  sendSmtpEmail.to = [{ email: `${email}` }];
  
  sendSmtpEmail.params = {
    parameter: 'My param value',
    subject: 'common subject',
  };
  await mongoose.disconnect();
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      // console.log(
      //   'API called successfully. Returned data: ' + JSON.stringify(data)
      // );
      return res.json({ message: verificationCode });
    },
    function (error) {
      console.error(error);
    }
  );
});

export default router;

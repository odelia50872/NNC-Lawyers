const express = require('express');
const nodemailer = require('nodemailer');
const emailContent = require('../config/emailContent');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post('/', async (req, res) => {
    const { name, email, phone, message, lang } = req.body;
    const { subject, text } = (emailContent[lang] || emailContent.he)(name, email, phone, message);
    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject,
            text,
            replyTo: email,
        });
        res.json({ success: true });
    } catch (err) {
        console.error('Email error:', err);
        res.status(500).json({ success: false });
    }
});

module.exports = router;

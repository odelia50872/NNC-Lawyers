const resend = require('../tools/mailer');
const { contactEmailContent, welcomeAddedEmailContent } = require('../templates/emailTemplates');

const sendContactEmail = async (req, res) => {
    const { name, email, phone, message, lang } = req.body;
    const { subject, text } = (contactEmailContent[lang] || contactEmailContent.he)(name, email, phone, message);
    try {
        await resend.emails.send({
            from: 'NNC-Law <onboarding@resend.dev>',
            to: process.env.EMAIL_USER,
            subject,
            text,
            reply_to: email,
        });
        res.json({ success: true });
    } catch (err) {
        console.error('Email error:', err);
        res.status(500).json({ success: false });
    }
};

const sendWelcomeEmail = async (req, res) => {
    const { name, email, password, lang } = req.body;
    const { subject, html } = (welcomeAddedEmailContent[lang] || welcomeAddedEmailContent.he)(name, email, password);
    try {
        await resend.emails.send({
            from: 'NNC-Law <onboarding@resend.dev>',
            to: email,
            subject,
            html,
        });
        res.json({ success: true });
    } catch (err) {
        console.error('Welcome email error:', err);
        res.status(500).json({ success: false });
    }
};

module.exports = { sendContactEmail, sendWelcomeEmail };

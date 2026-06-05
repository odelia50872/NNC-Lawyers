const emailContent = {
    he: (name, email, phone, message) => ({
        subject: `פנייה מהאתר — ${name}`,
        text: `שם: ${name}\nאימייל: ${email}\nטלפון: ${phone}\n\nהודעה:\n${message}`,
    }),
    fr: (name, email, phone, message) => ({
        subject: `Message du site — ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
    }),
};

module.exports = emailContent;

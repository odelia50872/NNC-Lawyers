const contactEmailContent = {
    he: (name, email, phone, message) => ({
        subject: `פנייה מהאתר — ${name}`,
        text: `שם: ${name}\nאימייל: ${email}\nטלפון: ${phone}\n\nהודעה:\n${message}`,
    }),
    fr: (name, email, phone, message) => ({
        subject: `Message du site — ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
    }),
};

const welcomeAddedEmailContent = {
    he: (name, username, password) => ({
        subject: `ברוך הבא, ${name}!`,
        html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>שלום ${name},</p>
<p>שמחים לעדכן שחשבונך נוצר בהצלחה במערכת על ידי מנהל האתר.</p>
<p>אלו פרטי ההתחברות הקבועים שלך:</p>
<ul>
  <li><strong>כתובת המייל שבאמצעותה תתחבר לאזור האישי:</strong> ${username}</li>
  <li><strong>סיסמא:</strong> ${password}</li>
</ul>
<p>לידיעתך, מטעמי אבטחה וניהול מערכת, סיסמא זו היא קבועה ולא ניתן לשנותה.</p>
<p>בברכה,<br/>צוות האתר</p>
</div>`,
    }),
    fr: (name, username, password) => ({
        subject: `Bienvenue, ${name}!`,
        html: `<div dir="ltr" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>Bonjour ${name},</p>
<p>Nous avons le plaisir de vous informer que votre compte a été créé avec succès par l'administrateur.</p>
<p>Voici vos identifiants de connexion permanents :</p>
<ul>
  <li><strong>Adresse e-mail avec laquelle vous vous connecterez à votre espace personnel :</strong> ${username}</li>
  <li><strong>Mot de passe :</strong> ${password}</li>
</ul>
<p>Veuillez noter que pour des raisons de sécurité, ce mot de passe est fixe et ne peut pas être modifié.</p>
<p>Cordialement,<br/>L'équipe du site</p>
</div>`,
    }),
};

const resetPasswordEmailContent = {
    he: (name, newPassword) => ({
        subject: 'איפוס סיסמה — NNC-Law',
        html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>שלום ${name},</p>
<p>קיבלנו בקשה לאיפוס הסיסמה שלך. הסיסמה החדשה שלך היא:</p>
<p style="font-size:20px;font-weight:bold;letter-spacing:2px;color:#111;">${newPassword}</p>
<p>אנא התחבר עם סיסמה זו ושמור אותה במקום בטוח.</p>
<p>בברכה,<br/>צוות NNC-Law</p>
</div>`,
    }),
    fr: (name, newPassword) => ({
        subject: 'Réinitialisation du mot de passe — NNC-Law',
        html: `<div dir="ltr" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>Bonjour ${name},</p>
<p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Votre nouveau mot de passe est :</p>
<p style="font-size:20px;font-weight:bold;letter-spacing:2px;color:#111;">${newPassword}</p>
<p>Veuillez vous connecter avec ce mot de passe et le conserver en lieu sûr.</p>
<p>Cordialement,<br/>L'équipe NNC-Law</p>
</div>`,
    }),
};

module.exports = { contactEmailContent, welcomeAddedEmailContent, resetPasswordEmailContent };

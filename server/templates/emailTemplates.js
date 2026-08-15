const autoReplyFooter = {
    he: `<hr style="border:none;border-top:1px solid #ddd;margin:24px 0;"/>
<p style="font-size:12px;color:#888;">
הודעה זו נשלחה באופן אוטומטי - אנא אל תשיב למייל זה.<br/>
לכל שאלה או פנייה ניתן לפנות אלינו ישירות: <a href="mailto:nnc@nnc-law.com" style="color:#555;">nnc@nnc-law.com</a>
</p>`,
    fr: `<hr style="border:none;border-top:1px solid #ddd;margin:24px 0;"/>
<p style="font-size:12px;color:#888;">
Ce message a été envoyé automatiquement - merci de ne pas répondre à cet email.<br/>
Pour toute question, vous pouvez nous contacter directement : <a href="mailto:nnc@nnc-law.com" style="color:#555;">nnc@nnc-law.com</a>
</p>`,
};

const contactEmailContent = {
    he: (name, email, phone, message) => ({
        subject: `פנייה מהאתר - ${name}`,
        text: `שם: ${name}\nאימייל: ${email}\nטלפון: ${phone}\n\nהודעה:\n${message}`,
    }),
    fr: (name, email, phone, message) => ({
        subject: `Message du site - ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
    }),
};

const welcomeAddedEmailContent = {
    he: (name, username, password) => ({
        subject: `ברוך הבא, ${name}!`,
        html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>שלום ${name},</p>
<p>שמחים לעדכן שחשבונך נוצר בהצלחה במערכת על ידי מנהל האתר.</p>
<p>אלו פרטי ההתחברות הזמניים שלך:</p>
<ul>
  <li><strong>אימייל:</strong> ${username}</li>
  <li><strong>סיסמה זמנית:</strong> <span style="font-size:18px;font-weight:bold;letter-spacing:2px;color:#111;">${password}</span></li>
</ul>
<p style="color:#c00;"><strong>בכניסה הראשונה תתבקש לשנות את הסיסמה.</strong></p>
<p>בברכה,<br/>צוות NNC-Law</p>
${autoReplyFooter.he}</div>`,
    }),
    fr: (name, username, password) => ({
        subject: `Bienvenue, ${name}!`,
        html: `<div dir="ltr" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>Bonjour ${name},</p>
<p>Nous avons le plaisir de vous informer que votre compte a été créé avec succès par l'administrateur.</p>
<p>Voici vos identifiants de connexion temporaires :</p>
<ul>
  <li><strong>Email :</strong> ${username}</li>
  <li><strong>Mot de passe temporaire :</strong> <span style="font-size:18px;font-weight:bold;letter-spacing:2px;color:#111;">${password}</span></li>
</ul>
<p style="color:#c00;"><strong>Lors de votre première connexion, vous devrez changer votre mot de passe.</strong></p>
<p>Cordialement,<br/>L'équipe NNC-Law</p>
${autoReplyFooter.fr}</div>`,
    }),
};

const resetPasswordEmailContent = {
    he: (name, newPassword) => ({
        subject: 'איפוס סיסמה — NNC-Law',
        html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>שלום ${name},</p>
<p>קיבלנו בקשה לאיפוס הסיסמה שלך. להלן <strong>סיסמה זמנית</strong> לכניסה לחשבונך:</p>
<p style="font-size:20px;font-weight:bold;letter-spacing:2px;color:#111;background:#f5f5f5;padding:10px;display:inline-block;border-radius:4px;">${newPassword}</p>
<p style="color:#c00;"><strong>בכניסה הראשונה עם סיסמה זו תתבקש לבחור סיסמה חדשה.</strong></p>
<p>אם לא ביקשת איפוס סיסמה, אנא פנה אלינו מיידית.</p>
<p>בברכה,<br/>צוות NNC-Law</p>
${autoReplyFooter.he}</div>`,
    }),
    fr: (name, newPassword) => ({
        subject: 'Réinitialisation du mot de passe — NNC-Law',
        html: `<div dir="ltr" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>Bonjour ${name},</p>
<p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Voici votre <strong>mot de passe temporaire</strong> :</p>
<p style="font-size:20px;font-weight:bold;letter-spacing:2px;color:#111;background:#f5f5f5;padding:10px;display:inline-block;border-radius:4px;">${newPassword}</p>
<p style="color:#c00;"><strong>Lors de votre première connexion avec ce mot de passe, vous serez invité(e) à en choisir un nouveau.</strong></p>
<p>Si vous n'avez pas demandé cette réinitialisation, veuillez nous contacter immédiatement.</p>
<p>Cordialement,<br/>L'équipe NNC-Law</p>
${autoReplyFooter.fr}</div>`,
    }),
};

module.exports = { contactEmailContent, welcomeAddedEmailContent, resetPasswordEmailContent };

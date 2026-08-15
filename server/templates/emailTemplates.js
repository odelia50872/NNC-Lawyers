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

const passwordBox = (password, dir = 'rtl') => `
<table style="margin:16px 0;" cellpadding="0" cellspacing="0">
  <tr>
    <td style="background:#f0f4ff;border:2px dashed #4a6cf7;border-radius:6px;padding:12px 24px;font-size:22px;font-weight:bold;letter-spacing:3px;color:#111;font-family:monospace;">${password}</td>
    <td style="padding-${dir === 'rtl' ? 'right' : 'left'}:12px;font-size:12px;color:#888;vertical-align:middle;">${dir === 'rtl' ? '← העתק את הסיסמה' : 'Copiez le mot de passe →'}</td>
  </tr>
</table>`;

const welcomeAddedEmailContent = {
    he: (name, username, password) => ({
        subject: `ברוך הבא, ${name}!`,
        html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>שלום ${name},</p>
<p>שמחים לעדכן שחשבונך נוצר בהצלחה במערכת NNC-Law.</p>
<p>להלן פרטי ההתחברות הזמניים שלך:</p>
<p><strong>אימייל:</strong> ${username}</p>
<p><strong>סיסמה זמנית:</strong></p>
${passwordBox(password, 'rtl')}
<p style="color:#c00;"><strong>בכניסה הראשונה תתבקש לבחור סיסמה חדשה.</strong></p>
<p>בברכה,<br/>צוות NNC-Law</p>
${autoReplyFooter.he}</div>`,
    }),
    fr: (name, username, password) => ({
        subject: `Bienvenue, ${name}!`,
        html: `<div dir="ltr" style="font-family:Arial,sans-serif;font-size:15px;color:#222;">
<p>Bonjour ${name},</p>
<p>Nous avons le plaisir de vous informer que votre compte a été créé avec succès sur NNC-Law.</p>
<p>Voici vos identifiants de connexion temporaires :</p>
<p><strong>Email :</strong> ${username}</p>
<p><strong>Mot de passe temporaire :</strong></p>
${passwordBox(password, 'ltr')}
<p style="color:#c00;"><strong>Lors de votre première connexion, vous serez invité(e) à choisir un nouveau mot de passe.</strong></p>
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
${passwordBox(newPassword, 'rtl')}
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
${passwordBox(newPassword, 'ltr')}
<p style="color:#c00;"><strong>Lors de votre première connexion avec ce mot de passe, vous serez invité(e) à en choisir un nouveau.</strong></p>
<p>Si vous n'avez pas demandé cette réinitialisation, veuillez nous contacter immédiatement.</p>
<p>Cordialement,<br/>L'équipe NNC-Law</p>
${autoReplyFooter.fr}</div>`,
    }),
};

module.exports = { contactEmailContent, welcomeAddedEmailContent, resetPasswordEmailContent };

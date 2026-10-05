const { getUserByEmail, getAllUsersPaginated: getAllUsersPaginatedService, searchUsers: searchUsersService, getUserById: getUserByIdService, createUser: createUserService, updateUser: updateUserService, deleteUser: deleteUserService } = require('../services/userService');
const { welcomeAddedEmailContent } = require('../templates/emailTemplates');
const resend = require('../tools/mailer');

const searchUsers = async (req, res) => {
    try {
        const rows = await searchUsersService(req.query.q || '');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search users' });
    }
};

const getAllUsersPaginated = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const { rows, total } = await getAllUsersPaginatedService(limit, offset);
        res.json({ clients: rows, total });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, full_name, emailLang } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS' });
        }

        const password = Math.random().toString(36).slice(-6) + Math.random().toString(36).slice(-2).toUpperCase() + Math.floor(Math.random() * 90 + 10);

        await createUserService({ ...req.body, password });

        const lang = emailLang || 'he';
        const { subject, html } = (welcomeAddedEmailContent[lang] || welcomeAddedEmailContent.he)(full_name, email, password);
        resend.emails.send({
            from: 'NNC-Law <noreply@nnc-law.com>',
            to: email,
            subject,
            html,
        }).catch(err => console.error('Welcome email failed:', err.message));

        res.status(201).json({ success: true });
    } catch (err) {
        console.error('createUser error:', err.message, err.stack);
        res.status(500).json({ error: 'Failed to create user', details: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { full_name, email } = req.body;
        const existing = await getUserByIdService(req.params.id);
        if (!existing) return res.status(404).json({ error: 'User not found' });

        const emailChanged = email && email !== existing.email;

        if (emailChanged) {
            const taken = await getUserByEmail(email);
            if (taken) return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS' });

            const password = Math.random().toString(36).slice(-6) + Math.random().toString(36).slice(-2).toUpperCase() + Math.floor(Math.random() * 90 + 10);
            await updateUserService(req.params.id, { full_name: full_name || existing.full_name, email, password, must_change_password: 1 });

            const lang = existing.emailLang || 'he';
            const { subject, html } = (welcomeAddedEmailContent[lang] || welcomeAddedEmailContent.he)(full_name || existing.full_name, email, password);
            resend.emails.send({ from: 'NNC-Law <noreply@nnc-law.com>', to: email, subject, html })
                .catch(err => console.error('Update email failed:', err.message));
        } else {
            await updateUserService(req.params.id, { full_name: full_name || existing.full_name, email: existing.email });
        }

        res.json({ message: 'User updated successfully', emailChanged });
    } catch (err) {
        console.error('updateUser error:', err.message);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await deleteUserService(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = { getAllUsersPaginated, searchUsers, getUserById, createUser, updateUser, deleteUser };

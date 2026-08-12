const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign(
    { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
    process.env.JWT_SECRET,
    { expiresIn: '30m' }
);

const setTokenCookie = (res, token) => res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 60 * 1000,
});

module.exports = { signToken, setTokenCookie };

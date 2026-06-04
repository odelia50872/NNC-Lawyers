const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { verifySelfOrAdmin } = require('../middleware/userMiddleware');

router.get('/',       verifyToken, verifyAdmin,       getAllUsers);
router.get('/:id',    verifyToken, verifySelfOrAdmin, getUserById);
router.post('/',      verifyToken, verifyAdmin,       createUser);
router.put('/:id',    verifyToken, verifySelfOrAdmin, updateUser);
router.delete('/:id', verifyToken, verifyAdmin,       deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllUsersPaginated, searchUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { verifySelfOrAdmin } = require('../middleware/userMiddleware');

router.get('/paginated',   verifyToken, verifyAdmin,       getAllUsersPaginated);
router.get('/search',      verifyToken, verifyAdmin,       searchUsers);
router.get('/:id',         verifyToken, verifySelfOrAdmin, getUserById);
router.post('/',           verifyToken, verifyAdmin,       createUser);
router.put('/:id',         verifyToken, verifySelfOrAdmin, updateUser);
router.delete('/:id',      verifyToken, verifyAdmin,       deleteUser);

module.exports = router;

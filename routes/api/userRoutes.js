const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser,
    addReaction,
    removeReaction
} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);
// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);
// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;
// Path: routes/api/index.js
const { ObjectId } = require('mongodb');
const { User, Thought } = require('../../models');

module.exports = {
//get all users
async getAllUsers (req, res) {
    try {
        const userData = await User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
},

//get user by id
async getUserById (req, res) {
    try {
        const userData = await User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v');
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
},

//create a user
async addUser (req, res) {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
},

//update a user
async updateUser (req, res) {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
},

//delete a user
async removeUser (req, res) {
    try {
        const userData = await User.findOneAndDelete({ _id: req.params.id });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        //remove user's associated thoughts
        await Thought.deleteMany({ username: userData.username });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
},

//add a friend
async addFriend (req, res) {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
},

//remove a friend
async removeFriend (req, res) {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
};
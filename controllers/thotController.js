const {ObjectId} = require('mongodb');
const {User, Thought} = require('../models');

module.exports = {
    //get all thoughts
    async getAllThoughts (req, res) {
        console.log('get all thoughts req received');
        try {
            const thoughtData = await Thought.find()
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: -1 });
                console.log(thoughtData);
            res.status(200).json(thoughtData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    //get thought by id
    async getThoughtById (req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.id })
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v');
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a thought
    async addThought (req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            //find the user and push the thought id to the user's thoughts array
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    //update a thought
    async updateThought (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    //delete a thought
    async removeThought (req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            //find the user and remove the thought id from the user's thoughts array
            const userData = await User.findOneAndUpdate(
                { username: thoughtData.username },
                { $pull: { thoughts: thoughtData._id } },
                { new: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'No user found with this username!' });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //add a reaction
    async addReaction (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete a reaction
    async removeReaction (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
const connection = require('../config/connections');
const { User, Thought } = require('../models');
const { randomUsername, randomThought, randomReaction, randomDate } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    //delete all collections
    await User.deleteMany({});
    await Thought.deleteMany({});

    //create users
    const users = await User.insertMany(
        [
            {
                username: randomUsername(),
                email: this.username + '@email.com',
                
            }
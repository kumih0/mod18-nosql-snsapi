const connection = require('../config/connections');
const { User, Thought } = require('../models');
const { randomUsername, randomThought, randomReaction, randomDate } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    //delete all collections
    await User.deleteMany({});
    await Thought.deleteMany({});

    //create empty users array
    const users = [];

    //make 30 users
    for(let i = 0; i <= 30; i++) {
        const username = randomUsername();
        const email = username + '@email.com';
        const thoughts = [];
        const friends = [];

        users.push({username, email, thoughts, friends});
    }
    console.log(users);
    let totalThotCount = 0;
    for(const user of users) {
        totalThotCount += user.userThots.length;
    }
    console.log(totalThotCount);

    //get random user

//generating a random amount of reactions for single thought
    const reactions = [];
    reactions.length = Math.floor(Math.random() * 20 + 1);

    for(const reaction of reactions) {
        reaction = {
            reactionBody: randomReaction(),
            username: 
        }
    }
    

    const thoughts = [];
    thoughts.length = totalThotCount;

    for(let i = 0; i < totalThotCount; i++) {
        thoughts[i] = await Thought.collection.insertOne({
            thoughtText: randomThought(),
            createdAt: randomDate(),
            username: users[Math.floor(Math.random() * users.length)].username,
            reactions: []
        })
    }

  
});
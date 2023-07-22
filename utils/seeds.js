const connection = require('../config/connections');
const { User, Thought } = require('../models');
const { randomUsername, randomThought, randomReaction, randomDate, randomDateAfter } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    //delete all collections
    await User.deleteMany({});
    await Thought.deleteMany({});

    //create empty users array
    const users = [];

    //make 30 users
    for (let i = 0; i <= 30; i++) {
        const username = randomUsername();
        const email = username + '@email.com';
        const thoughts = [];
        const friends = [];

        users.push({ username, email, thoughts, friends });
    }

    console.log(users);

    //get random user helper funct
    const getRandomUser = () => {
        return users[Math.floor(Math.random() * users.length)].username;
    };

    //generate friends list
    for (const user of users) {
        if (user.friends == null){
            const friends = [];
            const totalFriends = Math.floor(Math.random() * users.length);

            //potential friend list will be filtered user array
            const potentialFriends = users.filter((friend) => friend.username !== user.username);

            //get random friend from potential friends array
            const getRandomFriend = () => {
                return potentialFriends[Math.floor(Math.random() * potentialFriends.length)].username;
            };

            //loop through total friends and push random user into friends array

            for(let i = 0; i <= totalFriends; i++ ){
                

                const newFriend = getRandomFriend();

                //filter users array to exclude all users already in friends array

                // friends.includes(newFriend) ? newFriend = getRandomUser()
            }
        }
    }

    let totalThotCount = 0;
    for (const user of users) {
        totalThotCount += user.userThots.length;
    }
    console.log(totalThotCount);


    //generating a random amount of reactions for single thought
    const genReactions = () => {
        //creating empty reactions array
        const reactions = [];
        //creating a random amount of reactions under 20
        reactions.length = Math.floor(Math.random() * 20 + 1);
        //passing in the parent thought object's createdat date
        const date = this.createdAt;

        for (const reaction of reactions) {
            //creating reaction obj based on schema and pushing into reactions array
            reaction = {
                reactionBody: randomReaction(),
                username: getRandomUser(),
                createdAt: randomDateAfter(date) //using helper funct to generate a random date, passing orig date as arg
            }
            reactions.push(reaction);
        };
        console.table(reactions);
        return reactions;
    }

    //create thought array and thought obj
    const thoughts = [];

    thoughts.length = totalThotCount;

    for(const thought of thoughts) {
        //creating thought object to insert in thoughts array
        thought = {
            thoughtText: randomThought(),
            createdAt: randomDate(),
            username: getRandomUser(),
            reactions: genReactions(),
        };
        thoughts.push(thought);
    };
    console.log(thoughts);

    //

});
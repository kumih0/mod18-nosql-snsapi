const connection = require('../config/connections');
const { User, Thought } = require('../models');
const { all } = require('../routes');
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
    const getRandomUser = (array) => {
        return array[Math.floor(Math.random() * array.length)].username;
    };

    //generate friends list MAP FOR EACH OR FILTER WILL GO FROM INDEX0 OR ARRAY UNTIL END OG LENGTH, CONDENSE
    for (const user of users) {
        if (user.friends == null) {
            const friends = [];
            const totalFriends = Math.floor(Math.random() * users.length);

            // //potential friend list will be filtered user array
            // const potentialFriends = users.filter((friend) => friend.username !== user.username);

            // //get random friend from potential friends array
            // const getRandomFriend = (potentialFriends) => {
            //     return potentialFriends[Math.floor(Math.random() * potentialFriends.length)].username;
            // };

            //loop through total friends and push random user into friends array
            for (let i = 0; i <= totalFriends; i++) {
                //check the friends array and filter out any users already in the array
                const potentialFriends = users.filter((friend) => !friends.includes(friend) && friend.username !== user.username);
                console.log(potentialFriends);

                const newFriend = getRandomUser(potentialFriends);
                console.log(newFriend);
                friends.push(newFriend);
            }
            console.log(friends);
            user.friends = friends;
        }
    }

    // let totalThotCount = 0;
    // for (const user of users) {
    //     totalThotCount += user.userThots.length;
    // }
    // console.log(totalThotCount);


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
                username: getRandomUser(users),
                createdAt: randomDateAfter(date) //using helper funct to generate a random date, passing orig date as arg
            }
            reactions.push(reaction);
        };
        console.table(reactions);
        return reactions;
    }
    //creating empty thoughts array
    const allThoughts = [];

    //generate thoughts for each user
    for (const user of users) {
        //create thought array and thought obj
        const thoughts = [];
        thoughts.length = Math.floor(Math.random() * 20 + 1);

        for (const thought of thoughts) {
            //creating thought object to insert in thoughts array
            thought = {
                thoughtText: randomThought(),
                createdAt: randomDate(),
                username: user.username, //using this to refer to the user object
                reactions: genReactions(),
            };
            thoughts.push(thought);
            allThoughts.push(thought);
        };
        console.log(thoughts);
        user.thoughts = thoughts;
    }
    console.log(allThoughts);

    //insert users into db
    

    });
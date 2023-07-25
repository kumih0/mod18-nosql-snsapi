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

    //generate friends list for each user, map funct
    users.map((user) => {
        //create empty friends array
        const friends = [];
        //create random number of friends
        const totalFriends = Math.floor(Math.random() * users.length);
        //loop through total friends and push random user into friends array
        for (let i = 0; i <= totalFriends; i++) {
            //check the friends array and filter out any users already in the array
            const potentialFriends = users.filter((friend) => !friends.includes(friend) && friend.username !== user.username);

            const newFriend = getRandomUser(potentialFriends);
            friends.push(newFriend);
        }
        console.log(friends);
        user.friends = friends;
    });
    console.log(users);

    const allThoughts = [];

    //for each user, create a random number of thoughts
    users.map((user) => {
        //create empty thoughts array
        const thoughts = [];
        //create random number of thoughts
        const totalThoughts = Math.floor(Math.random() * 20);
        //loop through total thoughts and push random thought into thoughts array
        for (let i = 0; i <= totalThoughts; i++) {
            const thoughtText = randomThought();
            const createdAt = randomDate();
            const username = user.username;
            const reactions = [];

            thoughts.push({ thoughtText, createdAt, username, reactions });
        }
        allThoughts.push(thoughts);
        user.thoughts = thoughts;
        console.log(user);
    });

    //generate reactions for each thought
    allThoughts.map((thought) => {
        //create empty reactions array
        const reactions = [];
        //create random number of reactions
        const totalReactions = Math.floor(Math.random() * 20);
        
    //     //loop through total reactions and push random reaction into reactions array
    //     for (let i = 0; i <= totalReactions; i++) {
    //         const reactionBody = randomReaction();
    //         const username = getRandomUser(users);
    //         //reactions createdat date random num of days within a month after thought createdat date
    //         const createdAt = randomDateAfter();
            
    //         reactions.push({ reactionBody, username, createdAt });
    //     }
    //     thought.reactions = reactions;
    //     console.log(thought);
    // });




            // const allThoughts = [];

            // //generate thoughts for each user
            // users.map((user) => {
            //     //creating empty thoughts array
            //     const thoughts = [];
            //     //creating random amount of thoughts under 20
            //     thoughts.length = Math.floor(Math.random() * 20 + 1);
            //     //looping through thoughts array and creating thought obj
            //     thoughts.map((thought) => {
            //         thought = {
            //             thoughtText: randomThought(),
            //             createdAt: randomDate(),
            //             username: user.username,
            //             reactions: [],
            //         };
            //         //pushing thought into thoughts array
            //         thoughts.push(thought);
            //         //pushing thought into allThoughts array
            //         allThoughts.push(thought);
            //     });
            //     console.log(thoughts);
            //     //pushing thoughts array into user object
            //     user.thoughts = thoughts;
            // });
            // console.log(allThoughts);

            // //generate random reactions for each thought
            // allThoughts.map((thought) => {
            //     //creating empty reactions array
            //     const reactions = [];
            //     //creating random amount of reactions under 20
            //     reactions.length = Math.floor(Math.random() * 20 + 1);
            //     //reactions should only be created at or after the date of original post, passing 'date' as arg
            //     const thotDate = new Date(thought.createdAt);
            //     //creating reaction obj based on schema and pushing into reactions array
            //     reactions.map((reaction) => {
            //         reaction = {
            //             reactionBody: randomReaction(),
            //             username: getRandomUser(users),
            //             createdAt: randomDateAfter(thotDate),
            //         }
            //         //pushing reaction into reactions array
            //         reactions.push(reaction);
            //     });
            //     console.table(reactions);
            //     //pushing reactions array into thought object
            //     thought.reactions = reactions;
            // });
            // console.table(allThoughts);


            // //generating a random amount of reactions for single thought
            // const genReactions = (date) => {
            //     //creating empty reactions array
            //     const reactions = [];
            //     //creating a random amount of reactions under 20
            //     reactions.length = Math.floor(Math.random() * 20 + 1);
            //     //reactions should only be created at or after the date of original post, passing 'date' as arg
            //     const thotDate = new Date(date);
            //     //creating reaction obj based on schema and pushing into reactions array
            //     reactions.map((reaction) => {
            //         reaction = {
            //             reactionBody: randomReaction(),
            //             username: getRandomUser(users),
            //             createdAt: randomDateAfter(thotDate),
            //         }
            //         //pushing reaction into reactions array
            //         reactions.push(reaction);
            //     });
            //     console.table(reactions);
            //     return reactions;
            // };

            // //creating empty thoughts array
            // const allThoughts = [];

            // //generate thoughts for each user
            // users.map((user) => {
            //     //creating empty thoughts array
            //     const thoughts = [];
            //     //creating random amount of thoughts under 20
            //     thoughts.length = Math.floor(Math.random() * 20 + 1);
            //     //looping through thoughts array and creating thought obj
            //     thoughts.map((thought) => {
            //         thought = {
            //             thoughtText: randomThought(),
            //             createdAt: randomDate(),
            //             username: user.username,
            //             reactions: genReactions(this.createdAt),
            //         };
            //         //pushing thought into thoughts array
            //         thoughts.push(thought);
            //         //pushing thought into allThoughts array
            //         allThoughts.push(thought);
            //     });
            //     console.log(thoughts);
            //     //pushing thoughts array into user object
            //     user.thoughts = thoughts;
            // });
            // console.log(allThoughts);


            // for (const user of users) {
            //     //create thought array and thought obj
            //     const thoughts = [];
            //     thoughts.length = Math.floor(Math.random() * 20 + 1);

            //     for (let thought of thoughts) {
            //         //creating thought object to insert in thoughts array
            //         thought = {
            //             thoughtText: randomThought(),
            //             createdAt: randomDate(),
            //             username: user.username, //using this to refer to the user object
            //             reactions: genReactions(this.createdAt),
            //         };
            //         thoughts.push(thought);
            //         allThoughts.push(thought);
            //     };
            //     console.log(thoughts);
            //     user.thoughts = thoughts;
            // }
            // console.log(allThoughts);

            // //insert users into db
            // await User.collection.insertMany(users);
            // //insert thoughts into db
            // await Thought.collection.insertMany(allThoughts);


        });
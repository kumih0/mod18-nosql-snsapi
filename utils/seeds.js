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

            thoughts.push({ thoughtText, createdAt, username });
            allThoughts.push({ thoughtText, createdAt, username });
        }
        user.thoughts = thoughts;
        console.log(user);
    });
    console.log(allThoughts);


    //generate reactions for each thought
    allThoughts.map((thought) => {
        //create empty reactions array
        const reactions = [];
        //create random number of reactions
        const totalReactions = Math.floor(Math.random() * 20);
        //grab thought createdat from array
        let index = allThoughts.indexOf(thought);
        const thotDate = allThoughts[index].createdAt;
        console.log(thotDate);

        const randomDateAfter = () => {
            //new date obj same date as thought
            const date = new Date(thotDate);
            //generating a random number between 0-30, (within past month)
            const randomNumberOfDays = Math.floor(Math.random() * 30);
            //setting date value to be a random day within a month after thought createdat date
            date.setDate(date.getDate() + randomNumberOfDays);
            //returning new date value
            return date;
        }
        console.log(randomDateAfter());

        //loop through total reactions
        for (let i = 0; i <= totalReactions; i++) {
            const reactionBody = randomReaction();
            const username = getRandomUser(users);
            //calling randomdateafter funct
            const createdAt = randomDateAfter();

            reactions.push({ reactionBody, username, createdAt });
        }
        console.log(reactions);
        thought.reactions = reactions;
    });
    console.log(allThoughts);

    //insert users into db
    await User.collection.insertMany(users);
    //insert thoughts into db
    await Thought.collection.insertMany(allThoughts);

    console.table(users);
    console.table(allThoughts);
    console.log('all done!');
    process.exit(0);

});
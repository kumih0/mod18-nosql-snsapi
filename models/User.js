const { Schema, model } = require('mongoose');

//creating the user schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'You need to provide a username!',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'You need to provide an email address!',
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thots'
        }
    ],
    friends: [this] //self-reference user model as array
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of friends 
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', userSchema);

module.exports = User;
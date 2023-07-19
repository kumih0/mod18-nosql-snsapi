const {Schema, model} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'You need to provide a reaction!',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'You need to provide a username!',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //getter method to format the timestamp on query
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
}
);

module.exports = reactionSchema;
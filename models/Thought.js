const {Schema, model} = require('mongoose');
//import the reactionSchema
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);
// get total count of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
}
);
// create the Thought model using the ThoughtSchema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
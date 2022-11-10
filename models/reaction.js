const { schema, model, Types } = require('mongoose');
const moment = reequire('moment');

const reactionSchema = new schema({
    reactionId: {
        type: schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
    },
},
{
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionSchema;
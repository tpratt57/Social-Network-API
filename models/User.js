const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/.+\@.+\..+/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    },
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    ],
},
    {
        toJSONL: {
            virtuals: true,
        },
        id: false,
    },
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
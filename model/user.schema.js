const Schema = require("mongoose").Schema;

exports.UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    timeJoined: {
        type: Number,
        default: Date.now(),
    },
    userImage: String,
}, { collection: "Users_Project3" });


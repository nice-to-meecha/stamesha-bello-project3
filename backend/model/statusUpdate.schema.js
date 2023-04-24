const Schema = require("mongoose").Schema;

exports.StatusUpdateSchema = Schema({
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: '',
    },
    timestamp: {
        type: Number,
        default: Date.now,
    },
    lastEdited: {
        type: Number,
    },
    imageUrl: {
        type: String,
        default: '',
    },
}, { collection: "StatusUpdates_Project3" });

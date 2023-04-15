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
        default: Date.now(),
    },
    imageUrl: String,
}, { collection: "StatusUpdates_Project3" });

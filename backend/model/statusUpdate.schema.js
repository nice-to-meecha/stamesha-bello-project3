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
    imageUrl: {
        type: String,
        default: '',
    },
}, { collection: "StatusUpdates_Project3" });

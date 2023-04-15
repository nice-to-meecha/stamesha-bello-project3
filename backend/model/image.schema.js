const Schema = require("mongoose").Schema;

exports.ImageSchema = Schema({
    username: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    }
}, { collection: "Images_Project3" });

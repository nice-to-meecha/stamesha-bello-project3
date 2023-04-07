const model = require("mongoose").model;
const { UserSchema } = require("../model/user.schema");

const UserModel = model("UserModel", UserSchema);

/**
 * Creates a new user and stores it within the Users_Project3 collection
 * 
 * @param {any} user The user data to be stored
 * 
 * @returns void (Promise)
 */
function createUser(user) {
    return UserModel.create(user);
}

/**
 * Returns all users stored in the Users_Project3 collection
 * 
 * @returns All users stored in the Users_Project3 collection
 */
function getAllUsers() {
    return UserModel.find().exec();
}

/**
 * Finds and returns user data, according to the provided ID
 * 
 * @param {string} userId The unique ID by which the user will be
 *                        retrieved
 * 
 * @returns The user with the matching identifier (Promise)
 */
function getUserById(userId) {
    return UserModel.findById(userId).exec();
}

/**
 * Updates the provided properties of the identified user
 * 
 * @param {string} userId The unique ID by which the user will be
 *                        retrieved
 * @param {any} updatedContent The properties of the user to be updated
 * 
 * @returns void (Promise)
 */
function updateUser(userId, updatedContent) {
    return UserModel.findOneAndUpdate({ _id: userId }, updatedContent).exec();
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
}

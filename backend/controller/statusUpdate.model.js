const model = require("mongoose").model;
const { StatusUpdateSchema } = require("../model/statusUpdate.schema");

const StatusUpdateModel = model("StatusUpdateModel", StatusUpdateSchema);

/**
 * Creates and stored a status update within the StatusUpdates_Project3
 * collection
 * 
 * @param {any} statusUpdate The status update to be stored
 * 
 * @returns void (Promise)
 */
function createStatusUpdate(statusUpdate) {
    return StatusUpdateModel.create(statusUpdate);
}

/**
 * Returns all status updates stored in the StatusUpdates_Project3
 * collection
 * 
 * @returns All status updates stored in the StatusUpdates_Project3
 *          collection
 */
function getAllStatusUpdates() {
    return StatusUpdateModel.find().exec();
}

/**
 * Returns all status updates stored with the provided username
 * 
 * @param {string} username The username by which status updates will be found
 * 
 * @returns All status updates stored with the provided username
 */
function getStatusUpdatesByUsername(username) {
    return StatusUpdateModel.find({ username }).exec();
}

/**
 * Returns the status update matching the provided, unique ID
 * 
 * @param {string} statusUpdateId The ID by which a status update will
 *                                be found
 * @returns the status update matching the provided, unique ID
 */
function getStatusUpdateById(statusUpdateId) {
    return StatusUpdateModel.findById(statusUpdateId).exec();
}

/**
 * Updates the provided properties of the identified status update
 * 
 * @param {string} statusUpdateId    The unique ID by which the status
 *                                   update will be retrieved
 * @param {any} modifiedStatusUpdate The properties of the status
 *                                   update to be modified
 * 
 * @returns void (Promise)
 */
function modifyStatusUpdate(statusUpdateId, modifiedStatusUpdate) {
    return StatusUpdateModel.findByIdAndUpdate(statusUpdateId, modifiedStatusUpdate).exec();
}

/**
 * Deletes the status update with the matching ID
 * 
 * @param {string} statusUpdateId The ID of the status update to be deleted
 * 
 * @returns void (Promise)
 */
function deleteStatusUpdate(statusUpdateId) {
    return StatusUpdateModel.findByIdAndDelete(statusUpdateId).exec();
}

module.exports = {
    createStatusUpdate,
    getAllStatusUpdates,
    getStatusUpdatesByUsername,
    getStatusUpdateById,
    modifyStatusUpdate,
    deleteStatusUpdate,
}

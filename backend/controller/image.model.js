const model = require("mongoose").model;
const { ImageSchema } = require("../model/image.schema");

const ImageModel = model("ImageModel", ImageSchema);

/**
 * Creates and stores an image within the Images_Project3 collection
 * 
 * @param {any} image The image to be stored
 * 
 * @returns void (Promise)
 */
function createImage(image) {
    return ImageModel.create(image);
}

/**
 * Returns the image matching the provided, unique ID
 * 
 * @param {string} imageId The ID by which an image will be found
 * 
 * @returns the image matching the provided, unique ID
 */
function getImageById(imageId) {
    return ImageModel.findById(imageId);
}

/**
 * Updates the image matching the provided, unique ID
 * 
 * @param {string} imageId   The ID of the image to be updated
 * @param {any} updatedImage The image data that will replace the current
 *                           image
 * 
 * @returns void (Promise)
 */
function updateImageById(imageId, updatedImage) {
    return ImageModel.findByIdAndUpdate(imageId, updatedImage);
}

/**
 * Deletes the image matching the provided, unique ID
 * 
 * @param {string} imageId The ID of the image to be deleted
 * 
 * @returns void (Promise)
 */
function deleteImageById(imageId) {
    return ImageModel.findByIdAndDelete(imageId);
}

module.exports = {
    createImage,
    getImageById,
    updateImageById,
    deleteImageById,
}

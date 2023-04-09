const router = require("express").Router();
const ImageModel = require("./image.model");

router.get("/:imageId", (req, res) => {
    const { imageId } = req.params;
    ImageModel.getImageById(imageId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.post('/', (req, res) => {
    const image = req.body;
    ImageModel.createImage({ username, image })
        .then(data => {
            res.send(`Image successfully created.\n${data}`);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.put("/:imageId", (req, res) => {
    const { imageId } = req.params;
    const image = req.body;
    ImageModel.updateImageById(imageId, image)
        .then(data => {
            res.send(`Image successfully updated.\n${data}`);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.delete("/:imageId", (req, res) => {
    const { imageId } = req.params;
    ImageModel.deleteImageById(imageId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});
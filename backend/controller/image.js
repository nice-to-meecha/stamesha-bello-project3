const router = require("express").Router();
const fs = require("fs");
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
    try {
        req.busboy.on("file", (fieldName, fileStream, fileInfo) => {
            console.log(fieldName, fileStream, fileInfo);
            const fsStream = fs.createWriteStream(`../../frontend/public/${fileInfo.filename}`);
            fileStream.pipe(fsStream);
            fsStream.on("close", () => {
                console.log("File successfully uploaded!");
            });
        });
        req.pipe(req.busboy);
        return res.send("File uploaded")

    } catch (err) {
        console.error(err);
        return res.status(400).send(err);
    }
    
    // ImageModel.createImage({ username, image })
    //     .then(data => {
    //         res.send(`Image successfully created.\n${data}`);
    //     })
    //     .catch(err => {
    //         res.status(404).send(err);
    //     });
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

module.exports = router;

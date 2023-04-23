const router = require("express").Router();
const StatusUpdateModel = require("./statusUpdate.model");

router.get('/', (req, res) => {
    StatusUpdateModel.getAllStatusUpdates()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get("/users/:username", (req, res) => {
    const { username } = req.params;
    StatusUpdateModel.getStatusUpdatesByUsername(username)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get("/:statusUpdateId", (req, res) => {
    const { statusUpdateId } = req.params;
    StatusUpdateModel.getStatusUpdateById(statusUpdateId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.post('/', (req, res) => {
    const statusUpdate = req.body;
    StatusUpdateModel.createStatusUpdate(statusUpdate)
        .then(data => {
            res.send(`Status update successfully created.\n${data}`);
        })
        .catch(err => {
            res.status(401).send(err);
        });
});

router.put('/:statusUpdateId', (req, res) => {
    const { statusUpdateId } = req.params;
    const modifiedStatusUpdate = req.body;
    if (!modifiedStatusUpdate.text && !modifiedStatusUpdate.imageUrl) {
        return res.send(400).status("Status update must have text or image url");
    }

    StatusUpdateModel.modifyStatusUpdate(statusUpdateId, modifiedStatusUpdate)
        .then(data => {
            res.send(`Status update successfully modified.\n${data}`);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.delete('/:statusUpdateId', (req, res) => {
    const { statusUpdateId } = req.params;
    StatusUpdateModel.deleteStatusUpdate(statusUpdateId)
        .then(data => {
            res.send(`Status update successfully deleted.\n${data}`);
        })
        .catch(err => {
            res.status(404).send(err);
        })
});

module.exports = router;

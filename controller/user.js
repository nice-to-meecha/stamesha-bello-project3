const router = require("express").Router();
const UserModel = require("./user.model");

router.get('/', (req, res) => {
    UserModel.getAllUsers()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        })
})

router.get("/:userId", (req, res) => {
    const { userId } = req.params;
    UserModel.getUserById(userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        })
})

router.post('/', (req, res) => {
    const user = req.body;
    UserModel.createUser(user)
        .then(data => {
            res.send(`User created successfully.\n${data}`);
        })
        .catch(err => {
            res.status(404).send(err);
        });
})

router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const modifiedUser = req.body;
    UserModel.updateUser(userId, modifiedUser)
        .then(data => {
            res.send(`User updated successfully.\n${data}`);
        })
        .catch(err => {
            res.status(404).send(err);
        })
})
const router = require("express").Router();
const UserModel = require("./user.model");

router.get('/isLoggedIn', (req, res) => {
    const { userId } = req.cookies;
    res.send({ userId });
});

router.get('/', (req, res) => {
    UserModel.getAllUsers()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get("/username/:username", (req, res) => {
    const { username } = req.params;
    UserModel.getUserByUsername(username)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get("/:userId", (req, res) => {
    const { userId } = req.params;
    UserModel.getUserById(userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.post('/', (req, res) => {
    const user = req.body;
    UserModel.createUser(user)
        .then(data => {
            res.cookie("userId", data._id);
            // res.send(`User created successfully.\n${data}`);
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const modifiedUser = req.body;
    UserModel.updateUser(userId, modifiedUser)
        .then(data => {
            res.send(`User ${data.username} updated successfully.\n`);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.post('/logIn', (req, res) => {
    const { username, password } = req.body;
    UserModel.getUserByUsername(username)
        .then(data => {
            if (!data) {
                res.status(404).send(`Username ${username} not found`);

            } else if (data.password !== password) {
                res.status(401).send(`Password is incorrect`);

            } else {
                res.cookie("userId", data._id);
                res.send(data);
            }
                
        })
        .catch(err => {
            res.status(404).send(`${err}`);
        });
});

router.post('/logOut', (req, res) => {
    res.cookie("userId", "", {
        maxAge: 0,
    });
    res.send("User successfully logged out");
});

module.exports = router;

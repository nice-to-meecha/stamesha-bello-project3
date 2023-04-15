const router = require("express").Router();
const UserModel = require("./user.model");

router.get('/isLoggedIn', (req, res) => {
    const { username } = req.cookies;
    res.send({ username });
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
            res.send(`User created successfully.\n${data}`);
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
                res.cookie("username", username);
                res.send(data);
            }
                
        })
        .catch(err => {
            res.status(404).send(`${err}`);
        });
});

router.post('/logOut', (req, res) => {
    res.cookie("username", null, { maxAge: 0 });
    res.send("User successfully logged out");
});

module.exports = router;

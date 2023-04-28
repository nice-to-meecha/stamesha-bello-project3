const router = require("express").Router();
const jwt = require("jsonwebtoken");
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
    if (user.password?.length >= 8) {
        user.password = jwt.sign(user.password, process.env.SECRET);
    }

    UserModel.createUser(user)
        .then(data => {
            res.cookie("userId", data._id, { httpOnly: true });
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
            const decryptedPassword = jwt.verify(data.password, process.env.SECRET);
            if (!data) {
                res.status(404).send(`Username ${username} not found`);

            } else if (decryptedPassword !== password) {
                res.status(401).send(`Password is incorrect`);

            } else {
                res.cookie("userId", data._id, { httpOnly: true });
                res.send(data);
            }
                
        })
        .catch(err => {
            console.log(err);
            res.status(404).send(`${err}`);
        });
});

router.post('/logOut', (req, res) => {
    res.cookie("userId", "", {
        maxAge: 0,
        httpOnly: true,
    });
    res.send("User successfully logged out");
});

module.exports = router;

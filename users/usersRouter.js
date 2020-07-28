const router = require("express").Router();

const users = require("./userModel");

router.get("/", (req, res) => {
    users.get()
        .then(users => {
            res.status(200).json({ data: users, jwt: req.jwt });
        })
        .catch(err => res.send(err));
});

module.exports = router;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const user = require("../users/userModel");
const { isValid } = require("../users/userValidation");

router.post("/register", (req, res) => {
    let creds = req.body;

    if (isValid(creds)) {
        const rounds = process.env.HASH_ROUNDS || 8;

        const hash = bcryptjs.hashSync(creds.password, rounds);

        creds.password = hash;

        user.add(creds)
            .then(info => {
                const token = makeJwt(info);

                res.status(201).json({ data: info, token });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username, email and password. the password shoud be alphanumeric",
        });
    }

});

router.post("/login", (req, res) => {
    const { email, password } = req.body;


    if (isValid(req.body)) {
        user.getBy({ email: email })
            .then(([user]) => {
                console.log("user", user);
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJwt(user);

                    res.status(200).json({ message: "Welcome to Secret Family Receipes", token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: "please provide email and password",
        });
    }

    
});

function makeJwt(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        email: user.email,
    };

    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secret, options);
}


module.exports = router;

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../config/secrets');
const Users = require('../users/users-model');

function generateToken(user) {
    const payload = {
        subject: user.id, // subject in payload is what the token is about
        username: user.username,
        // ...otherData
    };

    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secret.jwtSecret, options)
}

router.post('/register', async (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    
    try {
        const saved = await Users.add(user)
        res.status(201).json(saved)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

router.post('/login', async (req, res) => {
    let {username, password} = req.body;
    const user = await Users.findBy({username});
    
    try {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome to Jurassic Park ${user.username}!`,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

module.exports = router;
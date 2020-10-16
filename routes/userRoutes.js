const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require('./../middlewares/auth');

router.get('/', async (req, res) => {
    res.send("User API 👨‍💻");
});

router.post('/register', async (req, res) => {
    try {
        let { displayName, email, password, passwordCheck } = req.body;

        if (!email || !password || !passwordCheck) {
            return res
                .status(400)
                .json({ msg: "Enter all the fields." });
        }
        if (password.length < 5) {
            return res
                .status(400)
                .json({ msg: "Password is too small. Needs to be atleast 5 characters long." });
        }
        if (password !== passwordCheck) {
            return res
                .status(400)
                .json({ msg: "Passwords are not matching." });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User already exists." });
        }

        if (!displayName) displayName = email;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: "Enter all the fields." });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "No account with this email!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ msg: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                displayName: user.displayName
            }
        });
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});


router.post('/isValidToken', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.json(false);
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!verifiedToken) {
            return res.json(false);
        }
        const user = await User.findById(verifiedToken.id);
        if (!user) {
            return res.json(false);
        }
        return res.json(true);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});

router.get('/currentUser', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json({
            displayName: user.displayName,
            email: user.email,
            id: user._id
        });
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});

router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
});


module.exports = router;
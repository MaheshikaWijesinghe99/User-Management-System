const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User');
const auth = require('./auth');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    await user.save();
    res.json({ message: 'User registered successfully' });
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.json({ token });
});

router.get('/users', auth, async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

module.exports = router;

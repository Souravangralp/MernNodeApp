const express = require('express');
const userService = require('../services/userService');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await userService.Create(req.body);
        res.status(201).json(user); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const token = await userService.login(req.body);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;
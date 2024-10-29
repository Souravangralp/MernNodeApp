const express = require('express');
const userService = require('../services/userService');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware'); // Adjust the path as needed

router.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(201).json(users); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/users/:id', authenticateToken,  async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL
        const userId = parseInt(id, 10); // Convert to an integer

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await userService.getWithId(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/users', authenticateToken,  async (req, res) => {
    try {
        const user = await userService.create(req.body);
        res.status(201).json(user); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/users/delete:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL
        const userId = parseInt(id, 10); // Convert to an integer

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await userService.delete(userId);
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/users', authenticateToken, async (req, res) => {
    try {
        const user = await userService.update(req.body);
        res.status(201).json(user); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
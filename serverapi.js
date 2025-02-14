require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticateToken, isAdmin } = require('./authMiddleware'); 
const authRoutes = require('./authRoutes'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

let items = [];

app.get('/user', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome user!', user: req.user });
});

app.get('/admin', authenticateToken, isAdmin, (req, res) => {
    res.json({ message: 'Welcome Admin!', user: req.user });
});

app.get('/items', authenticateToken, (req, res) => {
    res.json(items);
});

app.post('/items', authenticateToken, isAdmin, (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.patch('/items/:id', authenticateToken, isAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    if (items[id]) {
        items[id] = { ...items[id], ...req.body };
        res.json(items[id]);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.delete('/items/:id', authenticateToken, isAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    if (items[id]) {
        const deletedItem = items.splice(id, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

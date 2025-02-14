const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [];

app.get('/items', (req, res) => res.json(items));

app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.patch('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (items[id]) {
        items[id] = { ...items[id], ...req.body };
        res.json(items[id]);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.delete('/items/:id', (req, res) => {
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


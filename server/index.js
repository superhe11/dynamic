import express from 'express';
import cors from 'cors';
import { warehouseItems } from './items.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/items', (req, res) => {
    res.json(warehouseItems);
});

app.post('/items', (req, res) => {
    const newItem = { id: warehouseItems.length + 1, ...req.body };
    warehouseItems.push(newItem);
    res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;
    let itemFound = false;

    warehouseItems.forEach((item, index) => {
        if (item.id === id) {
            warehouseItems[index] = { ...item, ...updatedFields };
            itemFound = true;
        }
    });

    if (!itemFound) {
        return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item updated', updatedFields });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

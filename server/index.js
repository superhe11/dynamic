import express from 'express';
import cors from 'cors';
import { ITEMS_DATA } from './items.js';

const app = express();
app.use(cors());
app.use(express.json());

let idCounter =
    ITEMS_DATA.length > 0
        ? Math.max(...ITEMS_DATA.map((item) => item.id)) + 1
        : 1;

app.get('/items', (req, res) => {
    res.json(ITEMS_DATA);
});

app.post('/items', (req, res) => {
    const newItem = { id: idCounter++, ...req.body };
    ITEMS_DATA.push(newItem);
    res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;
    let itemFound = false;

    ITEMS_DATA.forEach((item, index) => {
        if (item.id === id) {
            ITEMS_DATA[index] = { ...item, ...updatedFields };
            itemFound = true;
        }
    });

    if (!itemFound) {
        return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item updated', updatedFields });
});

app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = ITEMS_DATA.find((item) => item.id === id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

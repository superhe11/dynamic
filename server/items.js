export const warehouseItems = [
    {
        id: 1,
        name: 'Laptop',
        category: 'Electronics',
        quantity: 5,
        location: 'Warehouse A',
        supplier: 'TechCorp',
        supplierLocation: 'New York',
        price: 1200,
        endpoints: [
            { endpoint: 'Endpoint 1', status: 'Pending' },
            { endpoint: 'Endpoint 2', status: 'Delivered' }
        ]
    },
    {
        id: 2,
        name: 'Office Chair',
        category: 'Furniture',
        quantity: 15,
        location: 'Warehouse B',
        supplier: 'FurniturePro',
        supplierLocation: 'San Francisco',
        price: 350,
        endpoints: [
            { endpoint: 'Endpoint 1', status: 'Delivering' },
            { endpoint: 'Endpoint 2', status: 'Delayed' }
        ]
    },
    {
        id: 3,
        name: 'Tennis Racket',
        category: 'Sports',
        quantity: 20,
        location: 'Warehouse C',
        supplier: 'SportingGoods',
        supplierLocation: 'Chicago',
        price: 150,
        endpoints: [
            { endpoint: 'Endpoint 1', status: 'Pending' },
            { endpoint: 'Endpoint 2', status: 'Canceled' }
        ]
    }
];

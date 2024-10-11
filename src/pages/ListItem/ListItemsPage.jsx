import { useEffect, useState } from 'react';
import { getItems } from '../../api.js';
import { ItemTable } from '../../components/ItemTable/ItemTable.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './ListItemsPage.module.css';

export const ListItemsPage = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getItems().then((response) => setItems(response.data));
    }, []);

    return (
        <div>
            <h1>Warehouse Items</h1>
            <ItemTable items={items} />
            <button className={styles.link} onClick={() => navigate('/create')}>
                Create New Item
            </button>
        </div>
    );
};

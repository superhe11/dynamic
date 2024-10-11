import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, updateItem } from '../../api';
import { ItemForm } from '../../components/ItemForm/ItemForm/ItemForm';
import styles from './EditItemPage.module.css';

export const EditItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        getItemById(id).then((response) => {
            setItem(response.data);
        });
    }, [id]);

    const handleSubmit = (data) => {
        updateItem(id, data).then(() => navigate('/'));
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <h1 className={styles.h1}>Edit Item</h1>
                {item && (
                    <ItemForm onSubmit={handleSubmit} defaultValues={item} />
                )}
                <button
                    onClick={() => navigate('/')}
                    className={styles.actionButton}
                >
                    Back to List
                </button>
            </div>
        </div>
    );
};

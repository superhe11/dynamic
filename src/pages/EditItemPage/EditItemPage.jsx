import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, updateItem } from '../../api';
import { ItemForm } from '../../components/ItemForm/ItemForm/ItemForm';
import styles from './EditItemPage.module.css';

export const EditItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await getItemById(id);
                setItem(response.data);
            } catch (error) {
                console.error('Failed to load item:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            await updateItem(id, data);
            navigate('/');
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Edit Item</h1>
                {loading ? (
                    <div className={styles.loader}>Loading...</div>
                ) : (
                    item && (
                        <ItemForm
                            onSubmit={handleSubmit}
                            defaultValues={item}
                        />
                    )
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

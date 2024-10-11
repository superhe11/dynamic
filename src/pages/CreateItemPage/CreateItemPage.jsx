import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../../api';
import { ItemForm } from '../../components/ItemForm/ItemForm/ItemForm';
import styles from './CreateItemPage.module.css';

export const CreateItemPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            await createItem(data);
            navigate('/');
        } catch (error) {
            console.error('Failed to create item:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <h1 className={styles.article}>Create Item</h1>
                <ItemForm onSubmit={handleSubmit} defaultValues={{}} />
                {loading ? (
                    <div className={styles.loader}>Creating item...</div>
                ) : (
                    <button
                        className={styles.link}
                        onClick={() => navigate('/')}
                    >
                        Back to List
                    </button>
                )}
            </div>
        </div>
    );
};

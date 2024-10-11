import { useNavigate } from 'react-router-dom';
import { createItem } from '../../api';
import { ItemForm } from '../../components/ItemForm/ItemForm/ItemForm';
import styles from './CreateItemPage.module.css';

export const CreateItemPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        createItem(data).then(() => navigate('/'));
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <h1 className={styles.article}>Create Item</h1>
                <ItemForm onSubmit={handleSubmit} defaultValues={{}} />
                <button className={styles.link} onClick={() => navigate('/')}>
                    Back to List
                </button>
            </div>
        </div>
    );
};

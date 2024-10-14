import { ItemRow } from './ItemRow';
import styles from './ItemTable.module.css';

export const ItemTable = ({ items = [] }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Category</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Location</th>
                    <th className={styles.th}>Supplier</th>
                    <th className={styles.th}>Supplier Location</th>
                    <th className={styles.th}>Price Type</th>
                    <th className={styles.th}>Price</th>
                    <th className={styles.th}>Endpoints</th>
                    <th className={styles.th}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.length > 0 ? (
                    items.map((item) => <ItemRow key={item.id} item={item} />)
                ) : (
                    <tr>
                        <td colSpan="10" className={styles.noItems}>
                            No items available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

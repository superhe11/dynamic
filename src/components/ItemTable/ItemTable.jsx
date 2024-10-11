import { useNavigate } from 'react-router-dom';
import styles from './ItemTable.module.css';

export const ItemTable = ({ items = [] }) => {
    const navigate = useNavigate();

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
                    items.map((item) => (
                        <tr key={item.id} className={styles.tbody_tr}>
                            <td className={styles.td}>{item.name}</td>
                            <td className={styles.td}>{item.category}</td>
                            <td className={styles.td}>{item.quantity}</td>
                            <td className={styles.td}>{item.location}</td>
                            <td className={styles.td}>
                                {item.supplier || 'N/A'}
                            </td>
                            <td className={styles.td}>
                                {item.supplierLocation || 'N/A'}
                            </td>
                            <td className={styles.td}>
                                {item.showPriceDetails === 'yes'
                                    ? item.priceType
                                    : 'N/A'}
                            </td>
                            <td className={styles.td}>
                                {item.showPriceDetails === 'yes' &&
                                typeof item.price !== 'undefined'
                                    ? item.price
                                    : 'N/A'}
                            </td>
                            <td className={styles.td}>
                                {item.endpoints && item.endpoints.length > 0 ? (
                                    <ul>
                                        {item.endpoints.map((endpoint, index) => (
                                            <li key={index}>
                                                {`${endpoint.endpoint} - ${endpoint.status}`}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No endpoints available</p>
                                )}
                            </td>
                            <td className={styles.td}>
                                <button
                                    onClick={() => navigate(`/edit/${item.id}`)}
                                    className={styles.link}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))
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

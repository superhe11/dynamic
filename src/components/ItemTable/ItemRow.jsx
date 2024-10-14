import { useNavigate } from 'react-router-dom';
import styles from './ItemTable.module.css';

export const ItemRow = ({ item }) => {
    const navigate = useNavigate();

    return (
        <tr className={styles.tbody_tr}>
            <td className={styles.td}>{item.name}</td>
            <td className={styles.td}>{item.category}</td>
            <td className={styles.td}>{item.quantity}</td>
            <td className={styles.td}>{item.location}</td>
            <td className={styles.td}>{item.supplier || 'N/A'}</td>
            <td className={styles.td}>{item.supplierLocation || 'N/A'}</td>
            <td className={styles.td}>
                {item.showPriceDetails === 'yes' ? item.priceType : 'N/A'}
            </td>
            <td className={styles.td}>
                {item.showPriceDetails === 'yes' &&
                typeof item.price !== 'undefined'
                    ? item.price
                    : 'N/A'}
            </td>
            <td className={styles.td}>
                {item.endpoints.length > 0 ? (
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
    );
};

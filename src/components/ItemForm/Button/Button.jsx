import styles from './Button.module.css';

export const Button = ({ type = 'button', onClick, className, label }) => (
    <button
        type={type}
        onClick={onClick}
        className={`${styles.button} ${className}`}
    >
        {label}
    </button>
);

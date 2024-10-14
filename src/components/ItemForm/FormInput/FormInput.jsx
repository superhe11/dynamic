import styles from './FormInput.module.css';

export const FormInput = ({ label, register, id, type = 'text', error }) => (
    <div className={styles.formGroup}>
        <label htmlFor={id}>{label}:</label>
        <input
            id={id}
            type={type}
            {...register}
            className={error ? styles.inputError : ''}
        />
        {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
);

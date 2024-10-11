import styles from './FormSelect.module.css';

export const FormSelect = ({ label, register, id, options, error }) => (
    <div className={styles.formGroup}>
        <label htmlFor={id}>{label}:</label>
        <select
            id={id}
            {...register}
            className={error ? styles.inputError : ''}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
);

import styles from './RadioGroup.module.css';

export const RadioGroup = ({ label, register, options, error }) => (
    <div className={styles.formGroup}>
        <label>{label}:</label>
        <div className={styles.radioGroup}>
            {options.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        {...register}
                        defaultChecked={option.defaultChecked}
                    />
                    {option.label}
                </label>
            ))}
        </div>
        {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
);

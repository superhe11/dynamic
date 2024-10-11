import styles from './EndpointFields.module.css';
import { FormInput } from '../FormInput/FormInput';
import { FormSelect } from '../FormSelect/FormSelect';
import { Button } from '../Button/Button';

export const EndpointFields = ({
    fields,
    register,
    errors,
    append,
    remove
}) => {
    return (
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <h3>Endpoints</h3>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className={`${styles.formGrid} ${styles.grid2}`}
                >
                    <FormInput
                        label={`Endpoint ${index + 1}*`}
                        id={`endpoints.${index}.endpoint`}
                        register={register(`endpoints.${index}.endpoint`)}
                        error={errors.endpoints?.[index]?.endpoint}
                        placeholder={`Endpoint ${index + 1}`}
                    />
                    <FormSelect
                        label="Status*"
                        id={`endpoints.${index}.status`}
                        register={register(`endpoints.${index}.status`)}
                        options={[
                            { value: '', label: 'Select status' },
                            { value: 'Delivering', label: 'Delivering' },
                            { value: 'Delivered', label: 'Delivered' },
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Delayed', label: 'Delayed' },
                            { value: 'Canceled', label: 'Canceled' }
                        ]}
                        error={errors.endpoints?.[index]?.status}
                    />
                    <Button
                        type="button"
                        className={styles.removeEndpointButton}
                        onClick={() => remove(index)}
                        label="Remove"
                    />
                </div>
            ))}

            <Button
                type="button"
                className={styles.addEndpointButton}
                onClick={() => append({ endpoint: '', status: '' })}
                label="Add Endpoint"
            />
        </div>
    );
};

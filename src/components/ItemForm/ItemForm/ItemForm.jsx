import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../FormInput/FormInput';
import { FormSelect } from '../FormSelect/FormSelect';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { EndpointFields } from '../EndpointFields/EndpointFields';
import { Button } from '../Button/Button';
import { schema } from './validationSchema';
import { extractChangedFields, extractFilledFields } from './formHelpers';
import styles from './ItemForm.module.css';

export const ItemForm = ({ defaultValues = {}, onSubmit }) => {
    const isEdit = Boolean(
        defaultValues && Object.keys(defaultValues).length > 0
    );

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, dirtyFields },
        reset
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'endpoints'
    });

    const showPriceDetails = watch('showPriceDetails') === 'yes';

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleFormSubmit = (data) => {
        let payload = {};

        if (isEdit) {
            payload = extractChangedFields(data, dirtyFields);
        } else {
            payload = extractFilledFields(data);
        }
        onSubmit(payload);
    };

    return (
        <div className={styles.formContainer}>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={styles.formWrapper}
            >
                <div className={`${styles.formGrid} ${styles.grid3}`}>
                    <FormInput
                        label="Name*"
                        id="name"
                        register={register('name')}
                        error={errors.name}
                    />
                    <FormSelect
                        label="Category*"
                        id="category"
                        register={register('category')}
                        options={[
                            { value: '', label: 'Select category' },
                            { value: 'Electronics', label: 'Electronics' },
                            { value: 'Furniture', label: 'Furniture' },
                            { value: 'Clothing', label: 'Clothing' },
                            { value: 'Food', label: 'Food' },
                            { value: 'Toys', label: 'Toys' },
                            { value: 'Books', label: 'Books' },
                            { value: 'Sports', label: 'Sports' }
                        ]}
                        error={errors.category}
                    />
                    <FormInput
                        label="Quantity*"
                        id="quantity"
                        type="number"
                        register={register('quantity')}
                        error={errors.quantity}
                    />
                </div>
                <div className={`${styles.formGrid} ${styles.grid2}`}>
                    <FormInput
                        label="Supplier"
                        id="supplier"
                        register={register('supplier')}
                        error={errors.supplier}
                    />
                    <FormInput
                        label="Supplier Location"
                        id="supplierLocation"
                        register={register('supplierLocation')}
                        error={errors.supplierLocation}
                    />
                </div>

                <RadioGroup
                    label="Show Price Details?"
                    register={register('showPriceDetails')}
                    options={[
                        {
                            value: 'yes',
                            label: 'Yes',
                            defaultChecked:
                                defaultValues?.showPriceDetails === 'yes'
                        },
                        {
                            value: 'no',
                            label: 'No',
                            defaultChecked:
                                defaultValues?.showPriceDetails !== 'yes'
                        }
                    ]}
                    error={errors.showPriceDetails}
                />
                {showPriceDetails && (
                    <div className={`${styles.formGrid} ${styles.grid2}`}>
                        <FormSelect
                            label="Price Type*"
                            id="priceType"
                            register={register('priceType')}
                            options={[
                                { value: '', label: 'Select type' },
                                { value: 'For Sale', label: 'For Sale' },
                                { value: 'For Buying', label: 'For Buying' }
                            ]}
                            error={errors.priceType}
                        />
                        <FormInput
                            label="Price*"
                            id="price"
                            type="number"
                            register={register('price')}
                            error={errors.price}
                            placeholder="Enter price"
                        />
                    </div>
                )}
                <EndpointFields
                    fields={fields}
                    register={register}
                    errors={errors}
                    append={append}
                    remove={remove}
                />
                <div className={styles.formActions}>
                    <Button
                        type="submit"
                        className={styles.actionButton}
                        label="Submit"
                    />
                </div>
            </form>
        </div>
    );
};

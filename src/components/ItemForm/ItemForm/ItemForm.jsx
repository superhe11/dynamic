import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../FormInput/FormInput';
import { FormSelect } from '../FormSelect/FormSelect';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { EndpointFields } from '../EndpointFields/EndpointFields';
import { Button } from '../Button/Button';
import * as yup from 'yup';
import styles from './ItemForm.module.css';

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .max(50, 'Max length is 50 characters'),
    category: yup.string().required('Category is required'),
    quantity: yup
        .number()
        .typeError('Quantity must be a number')
        .required('Quantity is required')
        .min(1, 'Quantity must be at least 1'),
    location: yup.string().notRequired(),
    supplier: yup.string().notRequired(),
    supplierLocation: yup.string().notRequired(),
    showPriceDetails: yup
        .string()
        .oneOf(['yes', 'no'], 'Please select an option')
        .required('Please select an option'),
    priceType: yup.string().when('showPriceDetails', {
        is: 'yes',
        then: (schema) => schema.required('Price Type is required'),
        otherwise: (schema) => schema.notRequired()
    }),
    price: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? undefined : value
        )
        .when('showPriceDetails', {
            is: 'yes',
            then: (schema) =>
                schema
                    .required('Price is required')
                    .typeError('Price must be a number')
                    .min(1, 'Price must be at least 1'),
            otherwise: (schema) => schema.notRequired()
        }),
    endpoints: yup.array().of(
        yup.object({
            endpoint: yup.string().required('Endpoint is required'),
            status: yup.string().required('Status is required')
        })
    )
});

const extractChangedFields = (data, dirtyFields) => {
    let changed = {};

    for (const key in dirtyFields) {
        if (
            typeof dirtyFields[key] === 'object' &&
            !Array.isArray(dirtyFields[key])
        ) {
            const nested = extractChangedFields(data[key], dirtyFields[key]);
            if (Object.keys(nested).length > 0) {
                changed[key] = nested;
            }
        } else if (Array.isArray(dirtyFields[key])) {
            changed[key] = data[key]
                .map((item, index) => {
                    if (dirtyFields[key][index]) {
                        return extractChangedFields(
                            item,
                            dirtyFields[key][index]
                        );
                    }
                    return null;
                })
                .filter((item) => item !== null);
        } else if (dirtyFields[key]) {
            changed[key] = data[key];
        }
    }

    return changed;
};

const extractFilledFields = (data) => {
    let filled = {};

    for (const key in data) {
        const value = data[key];

        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                const arrayFilled = value
                    .map((item) => extractFilledFields(item))
                    .filter((item) => Object.keys(item).length > 0);
                if (arrayFilled.length > 0) {
                    filled[key] = arrayFilled;
                }
            } else {
                const nestedFilled = extractFilledFields(value);
                if (Object.keys(nestedFilled).length > 0) {
                    filled[key] = nestedFilled;
                }
            }
        } else if (value !== undefined && value !== null && value !== '') {
            filled[key] = value;
        }
    }

    return filled;
};

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

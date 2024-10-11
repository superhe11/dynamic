import * as yup from 'yup';

export const schema = yup.object().shape({
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

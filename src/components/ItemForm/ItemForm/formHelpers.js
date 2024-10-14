export const extractChangedFields = (data, dirtyFields) => {
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

export const extractFilledFields = (data) => {
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

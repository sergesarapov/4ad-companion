export function getValuesByRegex(regex) {
    const matchedValues = [];
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
        if (regex.test(key)) {
            matchedValues.push({ key, value: localStorage.getItem(key) });
        }
    });

    return matchedValues;
}
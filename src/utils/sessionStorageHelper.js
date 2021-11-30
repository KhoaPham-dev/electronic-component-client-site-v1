export const getSessionObjectData = (key) => {
    try {
        const serializedData = sessionStorage.getItem(key);

        if (serializedData === null) {
            return undefined;
        }

        return JSON.parse(serializedData);
    } catch (error) {
        return undefined;
    }
};

export const setSessionObjectData = (key, data) => {
    try {
        const serializedData = JSON.stringify(data);
        sessionStorage.setItem(key, serializedData);
        return true;
    } catch (error) {
        return false
    }
};
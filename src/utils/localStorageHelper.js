export const setObjectData = (key, data) =>
    window.localStorage &&
    window.localStorage.setItem(key, JSON.stringify(data))

export const getObjectData = key => {
    let data = false
    if (window.localStorage && (data = window.localStorage.getItem(key))) {
        try {
            data = JSON.parse(data)
        } catch {
            data = false
        }
    }
    return data
}

export const setStringData = (key, value) =>
    window.localStorage && window.localStorage.setItem(key, value)

export const getStringData = key =>
    window.localStorage && window.localStorage.getItem(key)

export const removeStorageItem = key =>
    window.localStorage && window.localStorage.removeItem(key)

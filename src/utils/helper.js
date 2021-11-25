/**
 * @param {Any}
 * @return {String}
 */
function toVal(mix) {
    let k
    let y
    let str = ''

    if (typeof mix === 'string' || typeof mix === 'number') {
        str += mix
    } else if (typeof mix === 'object') {
        if (Array.isArray(mix)) {
            for (k = 0; k < mix.length; k++) {
                if (mix[k]) {
                    y = toVal(mix[k])
                    if (y) {
                        str && (str += ' ')
                        str += y
                    }
                }
            }
        } else {
            for (k in mix) {
                if (mix[k]) {
                    str && (str += ' ')
                    str += k
                }
            }
        }
    }

    return str
}

/**
 * @param {Any}
 * @return {String}
 */
export function clsx() {
    let i = 0
    let tmp
    let x
    let str = ''

    while (i < arguments.length) {
        tmp = arguments[i++]
        if (tmp) {
            x = toVal(tmp)
            if (x) {
                str && (str += ' ')
                str += x
            }
        }
    }

    return str
}

/**
 * Check input is Array or not
 * @param {Any} arr
 * @return {Boolean}
 */
const isArray = arr => Array.isArray(arr)

/**
 * Check input is Object or not
 * @param {Any} obj
 * @return {Boolean}
 */
const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj)

/**
 * Valid input is an Array
 * @param {Any} arr
 * @return {Array}
 */
export const ensureArray = (arr, defaultValue) =>
    isArray(arr) ? arr : isArray(defaultValue) ? defaultValue : []

/**
 * Valid input is an Object
 * @param {Any} arr
 * @return {Object}
 */
export const ensureObject = (obj, defaultValue) =>
    isObject(obj) ? obj : isObject(defaultValue) ? defaultValue : {}

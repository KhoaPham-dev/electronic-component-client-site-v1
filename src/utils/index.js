import { AppConstants, STATUS_DELETE } from '../constants'
import { showErrorMessage } from '../services/notifyService'

const Utils = {
    camelCaseToTitleCase(camelCase) {
        if (camelCase === null || camelCase === '') {
            return camelCase
        }

        camelCase = camelCase.trim()
        var newText = ''
        for (var i = 0; i < camelCase.length; i++) {
            if (
                /[A-Z]/.test(camelCase[i]) &&
                i !== 0 &&
                /[a-z]/.test(camelCase[i - 1])
            ) {
                newText += ' '
            }
            if (i === 0 && /[a-z]/.test(camelCase[i])) {
                newText += camelCase[i].toLowerCase()
            } else {
                newText += camelCase[i].toLowerCase()
            }
        }

        return newText
    },
    getCommonStatusItem(status) {
        const allStatus = [
            // ...commonStatus,
            { value: STATUS_DELETE, label: 'Delete', color: 'red' },
        ]
        const statusItem = allStatus.find(item => item.value === status)
        return statusItem
    },
    chunk(array, size) {
        const chunkedArr = []
        let copied = [...array] // ES6 destructuring
        const numOfChild = Math.ceil(copied.length / size) // Round up to the nearest integer
        for (let i = 0; i < numOfChild; i++) {
            chunkedArr.push(copied.splice(0, size))
        }
        return chunkedArr
    },
    beforeUploadImage(file) {
        const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            showErrorMessage('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            showErrorMessage('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
    },
    getBase64(img, callback) {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    },
    isEmptyObject(obj) {
        return (
            obj && Object.keys(obj).length === 0 && obj.constructor === Object
        )
    },
    formatNumber(value) {
        if (value) return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return ''
    },
    getFileNameFromPath(path) {
        if (path) return path.split('\\').pop().split('/').pop()
        return ''
    },
    getFileUrl: shortUrl =>
        shortUrl ? AppConstants.contentRootUrl + shortUrl : '',
}

export default Utils

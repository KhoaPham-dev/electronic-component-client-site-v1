const GENDER_MALE = 1
const GENDER_FEMALE = 2

export const genders = [
    { value: GENDER_MALE, label: 'Nam' },
    { value: GENDER_FEMALE, label: 'Nữ' },
]

const CATEGORY_KIND_IMPORT = 1;
const CATEGORY_KIND_EXPORT = 2;
const CATEGORY_KIND_PRODUCT = 3;
const CATEGORY_KIND_NEWS = 4;

export const categoryKinds = {
    CATEGORY_KIND_EXPORT,
    CATEGORY_KIND_IMPORT,
    CATEGORY_KIND_PRODUCT,
    CATEGORY_KIND_NEWS,
}

export const CART_MODAL = 1
export const LOGIN_MODAL = 2
export const REGISTER_MODAL = 3
export const REQUEST_RECOVERY_MODAL = 4
export const RECOVERY_MODAL = 5
export const PROFILE_MODAL = 6
export const ADDRESS_MODAL = 7
export const ORDERS_LIST_MODAL = 8
export const PRODUCT_DETAIL_MODAL = 9
export const PRODUCT_CHILD_MODAL = 10
export const PRODUCT_CHILD_MODAL_DETAIL = 11

export const PROVINCE_KIND_PROVINCE = 'PROVINCE_KIND_PROVINCE'
export const PROVINCE_KIND_DISTRICT = 'PROVINCE_KIND_DISTRICT'
export const PROVINCE_KIND_COMMUNE = 'PROVINCE_KIND_COMMUNE'
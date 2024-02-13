export function isEmail(value) {
    return value.includes('@')
}

export function isEmpty(value) {
    return value.trim() === ''
}

export function validatePassword(value) {
    // 비밀번호 8~20자, 소문자 1개, 대문자 1개, 숫자 1개, 특수문자 1개 이상 포함
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%])[A-Za-z\d!@#\$%]{8,20}$/;

    return regex.test(value);
}

export function isEqual(value, other) {
    return value === other;
}
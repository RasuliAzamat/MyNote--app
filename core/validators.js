export class Validators {
    static isFulled(value = '') {
        return value && value.trim();
    }

    static minLength(length) {
        return (value) => value.length >= length;
    }

    static maxLength(length) {
        return (value) => value.length <= length;
    }
}

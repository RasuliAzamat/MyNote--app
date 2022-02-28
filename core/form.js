export class Form {
    constructor(form, inputs) {
        this.form = form;
        this.inputs = inputs;
    }

    values() {
        const values = {};

        Object.keys(this.inputs).forEach((input) => {
            values[input] = this.form[input].value;
        });

        return values;
    }

    clear() {
        Object.keys(this.inputs).forEach((input) => {
            this.form[input].value = '';
        });
    }

    isValid() {
        let isFormValid = true;

        Object.keys(this.inputs).forEach((input) => {
            const validators = this.inputs[input];

            let isValidatorValid = true;

            validators.forEach((validator) => {
                isValidatorValid = validator(this.form[input].value) && isValidatorValid;
            });

            isValidatorValid ? hideError(this.form[input]) : showError(this.form[input]);

            isFormValid = isValidatorValid && isFormValid;
        });

        return isFormValid;
    }
}

function showError($input) {
    hideError($input);

    $input.closest('.create__form--item').classList.add('error');

    const error = `<p class="create__form--error">Введите корректное значение</p>`;
    $input.insertAdjacentHTML('afterend', error);
}

function hideError($input) {
    $input.closest('.create__form--item').classList.remove('error');

    if ($input.nextElementSibling) $input.nextElementSibling.remove();
}

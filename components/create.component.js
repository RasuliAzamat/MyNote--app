import { Component } from '../core/component.js';
import { Form } from '../core/form.js';
import { Validators } from '../core/validators.js';
import { apiService } from '../services/api.service.js';

export class CreateComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.$element.addEventListener('submit', submitHandler.bind(this));

        this.form = new Form(this.$element, {
            heading: [Validators.isFulled, Validators.maxLength(30)],
            text: [Validators.isFulled, Validators.minLength(10)],
        });
    }
}

async function submitHandler(event) {
    event.preventDefault();

    if (this.form.isValid()) {
        const formData = {
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            ...this.form.values(),
        };

        await apiService.postNote(formData);

        this.form.clear();
    }
}

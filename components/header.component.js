import { Component } from '../core/component.js';

export class HeaderComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        if (localStorage.getItem('visited')) {
            this.hide();
            document.documentElement.classList.add('unlock');
        }

        const button = document.getElementById('startBtn');
        button.addEventListener('click', headerHandler.bind(this));
    }
}

function headerHandler() {
    this.hide();
    document.documentElement.classList.add('unlock');

    localStorage.setItem('visited', true);
}

import { Component } from '../core/component.js';

export class NavigationComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.$element.addEventListener('click', navigationHandler.bind(this));
    }

    registerLink(links) {
        this.links = links;
    }
}

function navigationHandler(event) {
    event.preventDefault();

    if (event.target.classList.contains('burger')) {
        this.$element.classList.toggle('active');
        document.documentElement.classList.toggle('block-scroll');
    }

    if (event.target.classList.contains('nav__list--link')) {
        this.$element.classList.remove('active');
        document.documentElement.classList.remove('block-scroll');

        const links = Array.from(this.$element.querySelectorAll('.nav__list--link'));

        for (const link of links) {
            link.classList.remove('active');
        }

        event.target.classList.add('active');

        const activeLink = this.links.find((link) => link.name === event.target.dataset.name);

        this.links.forEach((link) => link.component.hide());
        activeLink.component.show();
    }
}

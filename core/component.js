export class Component {
    constructor(id) {
        this.$element = document.getElementById(id);
        this.init();
        this.links = [];
    }

    init() {}

    onShow() {}

    onHide() {}

    show() {
        this.$element.classList.add('active');
        this.onShow();
    }

    hide() {
        this.$element.classList.remove('active');
        this.onHide();
    }
}

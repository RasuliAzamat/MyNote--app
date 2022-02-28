import { Component } from '../core/component.js';
import { apiService } from '../services/api.service.js';
import { TransformService } from '../services/transform.service.js';
import { renderNote } from '../templates/note.template.js';

export class NotesComponent extends Component {
    constructor(id, { loader }) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$element.addEventListener('click', buttonHandler.bind(this));
    }

    async onShow() {
        this.loader.show();

        const firebaseData = await apiService.getNote();
        const notes = TransformService.firebaseObjectToArray(firebaseData);
        const html = notes.map((note) => renderNote(note, { withButton: true }));

        this.loader.hide();

        this.$element.insertAdjacentHTML('beforeend', html);
    }

    onHide() {
        const title = this.$element.firstElementChild;
        this.$element.innerHTML = '';
        this.$element.insertAdjacentElement('beforeend', title);
    }
}

function buttonHandler(event) {
    const target = event.target;
    const id = target.dataset.id;
    const name = target.dataset.name;

    if (name === 'favoriteBtn') {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.includes(id)) {
            favorites = favorites.filter((favoriteId) => favoriteId !== id);
            target.textContent = 'Добавить в избранное';
        } else {
            favorites.push(id);
            target.textContent = 'Удалить из избранного';
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

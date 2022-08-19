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
        try {
            this.loader.show();

            const firebaseData = await apiService.getNote();

            const notes = TransformService.firebaseObjectToArray(firebaseData);
            const html = notes.map((note) => renderNote(note, { withButton: true }));

            this.loader.hide();

            this.$element.insertAdjacentHTML('beforeend', html);
        } catch (error) {
            const errorText = `<p>Вы пока ничего не добавляли в Заметки</p>`;
            this.$element.insertAdjacentHTML('beforeend', errorText);

            this.loader.hide();
        }
    }

    onHide() {
        const title = this.$element.firstElementChild;
        this.$element.innerHTML = '';
        this.$element.insertAdjacentElement('beforeend', title);
    }
}

async function buttonHandler(event) {
    const target = event.target;
    const id = target.dataset.id;
    const name = target.dataset.name;

    const noteItem = event.target.closest('.notes__item');
    const noteTitle = noteItem.querySelector('.notes__item--title').textContent;
    const noteText = noteItem.querySelector('.notes__item--text').textContent;
    const noteDate = noteItem.querySelector('.notes__item--date').textContent;

    if (name === 'favoriteBtn') {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let candidate = favorites.find((favoritesItem) => favoritesItem.id === id);

        if (candidate) {
            favorites = favorites.filter((favoritesItem) => favoritesItem.id !== id);
            target.textContent = 'Добавить в избранное';
        } else {
            favorites.push({ id: id, title: noteTitle, text: noteText, date: noteDate });
            target.textContent = 'Удалить из избранного';
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    if (name === 'deleteNote') {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter((favoritesItem) => favoritesItem.id !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        await apiService.deleteById(id);
        noteItem.remove();

        const firebaseData = await apiService.getNote();

        const notes = TransformService.firebaseObjectToArray(firebaseData);

        if (!notes) {
            const errorText = `<p>Список заметок пуст</p>`;
            this.$element.insertAdjacentHTML('beforeend', errorText);
        }
    }
}

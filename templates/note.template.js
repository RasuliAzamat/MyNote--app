export function renderNote(note, options = {}) {
    const deleteButton = `
        <button class="notes__control--button button" data-name="deleteNote" data-id="${note.id}">
            Удалить заметку
        </button>
        `;

    const favoriteButton = `
        <button class="notes__control--button button" data-name="favoriteBtn" data-id="${note.id}">
            ${
                (localStorage.getItem('favorites') || []).includes(note.id)
                    ? 'Удалить из избранного'
                    : 'Добавить в избранное'
            }
        </button>
    `;
    return `
        <div class="notes__item">
            <h3 class="notes__item--title">${note.heading}</h3>
            <p class="notes__item--text">${note.text}</p>
            <p class="notes__item--date">${note.date}</p>
            <div class="notes__control">
                ${options.withButton ? deleteButton : ''}
                ${options.withButton ? favoriteButton : ''}
            </div>
        </div>
    `;
}

import { CreateComponent } from './components/create.component.js';
import { FavoritesComponent } from './components/favorites.component.js';
import { HeaderComponent } from './components/header.component.js';
import { Loader } from './components/loader.component.js';
import { NavigationComponent } from './components/navigation.component.js';
import { NotesComponent } from './components/notes.component.js';

new HeaderComponent('header');

const navigation = new NavigationComponent('navigation');
const loader = new Loader('loader');

const notes = new NotesComponent('notes', { loader });
const create = new CreateComponent('create');
const favorites = new FavoritesComponent('favorites', { loader });

navigation.registerLink([
    { name: 'notes', component: notes },
    { name: 'create', component: create },
    { name: 'favorites', component: favorites },
]);

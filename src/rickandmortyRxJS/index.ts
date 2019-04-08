import './css/styles.scss';
import './css/pagination.scss';

import { RickAndMortyCharacterProvider } from './RickAndMortyCharacterProvider';

/* Entry Point: */
const rickAndMortyProvider = new RickAndMortyCharacterProvider();
rickAndMortyProvider.renderCharacters();
  
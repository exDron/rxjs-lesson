import { from, fromEvent, Observable, of, combineLatest, interval, timer} from 'rxjs';
import { map, catchError, debounceTime, switchMap, delay, find, scan, filter, pluck, skip, startWith, take, takeLast, throttle} from 'rxjs/operators';
import './styles.scss';

interface Origin {
  name: string
}

interface Location {
  name: string
}

interface Character {
  id: number,
  name: string,
  image: string,
  status: string,
  species: string,
  gender: string,
  origin: Origin,
  location: Location
}

class RickAndMortyCharacterProvider {

  protected apiUrl: string = 'https://rickandmortyapi.com/graphql/';
  protected characterRequest: string = `{
      characters(page: 1) {
        results {
          id,
          name,
          image,
          status,
          species,
          gender,
          origin {
            name
          },
          location {
            name
          }
        }
      }
    }`;
    protected wrapperId: string = 'charaters-wrapper';
    protected searchIputId: string = '#search-input';
    protected characters: Array<Character> = [];

    constructor() {
      this.initSearchCharacter();
    }

    public renderCharacters(): void {
      const observable = this.getCharacters();
      observable.subscribe((res) => {
        this.characters = res.data.characters.results;
        this.renderCharacterCards(res.data.characters.results);
      });
    }

    protected initSearchCharacter() {
      const inputElem: HTMLInputElement | null = document.querySelector(this.searchIputId);
      if (!inputElem) {
        throw new Error('Search input is not exist!');
      }
      let input: Observable<Event> = fromEvent(inputElem, 'input');
      input.subscribe((search: any) => {
          let searchString: string = search.target.value.toLowerCase();
          let filteredCharacters: Array<Character> = this.characters.filter((character: Character) => {
              return character.name.toLowerCase().includes(searchString);
          });
          this.renderCharacterCards(filteredCharacters);          
      });

    }

    protected getCharacters(): Observable<any> {
      const observable: Observable<string> = new Observable(observer => {
        from(
            fetch(`${this.apiUrl}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: this.characterRequest }),
              })
            .then((res: Response) => res.json())
            .then((data: string) => {
              observer.next(data);
            })
            .catch((err) => console.log(err))
          )
        
      });

      return observable;
    }

    protected renderCharacterCards(characters: Array<Character>): void {
      let characterCards: string = '';
      characters.forEach((character: Character) => {
        characterCards += this.getCharacterCard(character); 
      });

      let charactersWrapper: HTMLElement | null = document.getElementById(this.wrapperId);
      if (charactersWrapper) {
        charactersWrapper.innerHTML = characterCards;
      }
    }

    protected getCharacterCard(character: Character): string {
      const characterTemplate = `<article class="character-card">
                                  <div class="character-card-header">
                                    <div class="card-image">
                                      <img src="${character.image}" alt="${character.name}">
                                    </div>
                                    <div class="character-card-title">
                                      <h2 class="character-name">${character.name}</h2>
                                      <p class="character-description">id: ${character.id} - created a year ago</p>
                                    </div>
                                  </div>
                                  <div class="character-info-block">
                                    <div class="character-status character-info-item">
                                      <span>STATUS</span>
                                      <p>${character.status}</p>
                                    </div>
                                    <div class="character-species character-info-item">
                                      <span>SPECIES</span>
                                      <p>${character.species}</p>
                                    </div>
                                    <div class="character-gender character-info-item">
                                      <span>GENDER</span>
                                      <p>${character.gender}</p>
                                    </div>
                                    <div class="character-origin character-info-item">
                                      <span>ORIGIN</span>
                                      <p>${character.origin.name}</p>
                                    </div>
                                    <div class="character-location character-info-item">
                                      <span>LAST LOCATION</span>
                                      <p>${character.location.name}</p>
                                    </div>
                                  </div>
                                </article>`
      
        return characterTemplate;
    }
}


/* Entry Point: */
  
const rickAndMortyProvider = new RickAndMortyCharacterProvider();
rickAndMortyProvider.renderCharacters();
  
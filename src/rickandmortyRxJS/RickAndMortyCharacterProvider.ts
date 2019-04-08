import { RickAndMortyCharacterRender } from "./RickAndMortyCharacterRender";
import { Character, Pagination } from "./models";
import { Observable, fromEvent, from } from "rxjs";

export class RickAndMortyCharacterProvider {

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
            },
          },
          info {
              pages,
              prev
            }
        }
      }`;
      protected searchIputId: string = '#search-input';
      protected paginationSelector = '.pagination-wrapper .pagination ul a';
      protected characters: Array<Character> = [];
      protected pagination: Pagination = {
          prev: null,
          pages: 25
      };
      protected renderer: RickAndMortyCharacterRender;
  
      constructor() {
        this.initSearchCharacter();
        this.initPagination();
        this.renderer = new RickAndMortyCharacterRender();
      }
  
      public renderCharacters(): void {
        const observable = this.getCharacters();
        observable.subscribe((res: any) => {
          this.characters = res.data.characters.results;
          this.pagination = res.data.characters.info;
          this.renderer.renderCharacterCards(res.data.characters.results, res.data.characters.info);
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
            this.renderer.renderCharacterCards(filteredCharacters, this.pagination);          
        });
      }

      protected initPagination() {
        let pagination = document.querySelectorAll(this.paginationSelector);
        console.log(pagination);
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
  }
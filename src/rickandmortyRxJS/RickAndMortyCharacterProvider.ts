import { RickAndMortyCharacterRender } from "./RickAndMortyCharacterRender";
import { Character, Pagination } from "./models";
import { Observable, fromEvent, from } from "rxjs";
import { ApiService } from "./ApiService";
import { SEARCH_INPUT_SELECTOR, PAGINATION_SELECTOR } from "./constants";


export class RickAndMortyCharacterProvider {

      protected characters: Array<Character> = [];
      protected pagination: Pagination = {
          prev: null,
          pages: 25
      };
      protected renderer: RickAndMortyCharacterRender;
      protected apiService: ApiService;
  
      constructor() {
        this.initSearchCharacter();
        this.initPagination();
        this.renderer = new RickAndMortyCharacterRender();
        this.apiService = new ApiService();
      }
  
      public renderCharacters(page: number): void {
        const observable = this.getCharacters(page);
        observable.subscribe((res: any) => {
          this.characters = res.data.characters.results;
          this.pagination = res.data.characters.info;
          this.renderer.renderCharacterCards(res.data.characters.results, res.data.characters.info).subscribe((res) => {
              this.initPagination();
          });
        });
      }
  
      protected initSearchCharacter() {
        const inputElem: HTMLInputElement | null = document.querySelector(SEARCH_INPUT_SELECTOR);
        if (!inputElem) {
          throw new Error('Search input is not exist!');
        }
        let input: Observable<Event> = fromEvent(inputElem, 'input');
        input.subscribe((search: any) => {
            let searchString: string = search.target.value.toLowerCase();
            let filteredCharacters: Array<Character> = this.characters.filter((character: Character) => {
                return character.name.toLowerCase().includes(searchString);
            });
            this.renderer.renderCharacterCards(filteredCharacters, this.pagination).subscribe((res) => {
              this.initPagination();
            });          
        });
      }

      protected initPagination() {
        let pagination = document.querySelectorAll(PAGINATION_SELECTOR);
        if (pagination.length) {
          pagination.forEach((item) => {
            item.addEventListener('click', (e: any) => {
              e.preventDefault();
              const page = e.srcElement.attributes.href.textContent;
              this.renderCharacters(page);
            });
          })
        }
      }
  
      protected getCharacters(page: number): Observable<any> {
        return this.apiService.makeGraphQlRequest(page);
      }
  }
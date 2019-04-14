import { Character, Pagination } from './models';
import { Observable } from 'rxjs';
import { CARD_WRAPPER_ID } from './constants';

export class RickAndMortyCharacterRender {
  
    public renderCharacterCards(characters: Array<Character>, pagination: Pagination): Observable<string> {
      return Observable.create((observer: any) => {
          let characterCards: string = '';
          characters.forEach((character: Character) => {
            characterCards += this.getCharacterCard(character); 
          });
    
          characterCards += this.getPagiantion(pagination);  
          let charactersWrapper: HTMLElement | null = document.getElementById(CARD_WRAPPER_ID);
          if (charactersWrapper) {
            charactersWrapper.innerHTML = characterCards;
          }
          observer.next();
      })
      
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
  
    protected getPagiantion(pagination: Pagination) {
        let prev = pagination.prev ? pagination.prev : 1;
        let current = pagination.prev == null ? 1 : prev + 1;
        let next = current + 1;

        return `<div class="pagination-wrapper">
                    <div class="container">
                        <div class="pagination p11">
                            <ul>
                                <a data-page="${prev}" href="${prev}">Previous</a>
                                <a class="is-active" href="${current}">${current}</a>
                                <a href="${next}">${next}</a>
                                <a href="${next + 1}">${next + 1}</a>
                                <a href="${next}">Next</a>
                            </ul>
                        </div>
                    </div>
                </div>`
    }
  
  }
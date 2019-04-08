import { Character, Pagination } from './models';

export class RickAndMortyCharacterRender {

    protected wrapperId: string = 'charaters-wrapper';
  
    public renderCharacterCards(characters: Array<Character>, pagination: Pagination): void {
      let characterCards: string = '';
      characters.forEach((character: Character) => {
        characterCards += this.getCharacterCard(character); 
      });

      characterCards += this.getPagiantion(pagination);  
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
  
    protected getPagiantion(pagination: Pagination) {
        let prev = pagination.prev ? pagination.prev : 1;
        let current = prev == 1 ? 1 : prev + 1;
        let next = current + 1;

        return `<div class="pagination-wrapper">
                    <div class="container">
                        <div class="pagination p11">
                            <ul>
                                <a href="${prev}"><li>Previous</li></a>
                                <a class="is-active" href="${current}"><li>${current}</li></a>
                                <a href="${next}"><li>${next}</li></a>
                                <a href="${next + 1}"><li>${next + 1}</li></a>
                                <a href="${next}"><li>Next</li></a>
                            </ul>
                        </div>
                    </div>
                </div>`
    }
  
  }
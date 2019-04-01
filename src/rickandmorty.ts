import { from, fromEvent, Observable, of, combineLatest, interval, timer} from 'rxjs';
import { map, catchError, debounceTime, switchMap, delay, find, scan, filter, pluck, skip, startWith, take, takeLast, throttle} from 'rxjs/operators';

const apiUrl = 'https://rickandmortyapi.com/graphql/';
const characterRequest: string = `{
    characters(page: 1) {
      results {
        id,
        name,
        image,
      }
    }
  }`;

  const observable = new Observable(subscriber => {
    from(
        fetch(`${apiUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{
                characters(page: 1) {
                  results {
                    id,
                    name,
                    image,
                  }
                }
              }` }),
          })
        .then((res: Response) => {subscriber.next(res.json())})
        .catch((err) => console.log(err))
      )
    
  });

  observable.subscribe((res) => {
    console.log();
  });
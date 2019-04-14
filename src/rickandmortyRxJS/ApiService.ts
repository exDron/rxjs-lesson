import { Observable, from} from "rxjs";
import { GRAPHQL_URL } from "./constants";

export class ApiService {
    
    public makeGraphQlRequest(page: number): Observable < any > {
        let characterRequest: string = `{
            characters(page: ${page}) {
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

        const observable: Observable < string > = new Observable(observer => {
            from(
                fetch(`${GRAPHQL_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: characterRequest
                    }),
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
import { catchError, of, pluck } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';

const url = 'https://api.github.com/users?per_page=5';


const manejaErrores = (Response: Response) => {

    if( !Response.ok ){
        throw new Error( Response.statusText);
    }

    return Response;

}

const atrapaError = ( error: AjaxError ) => {
    console.warn('error:', error);
    return of([]);
}


 const fetchPromesa = fetch ( url );

/*fetchPromesa
    .then( resp => resp.json())
    .then( data => console.log('data:', data))
    .catch( error => console.warn( 'error en usuarios', error ) );


    fetchPromesa
    .then( manejaErrores )
    .then( resp => resp.json())
    .then( data => console.log('data:', data))
    .catch( error => console.warn( 'error en usuarios', error ) ); */


ajax( url ).pipe(
    pluck('response'),
    catchError( atrapaError )
).subscribe(console.log);
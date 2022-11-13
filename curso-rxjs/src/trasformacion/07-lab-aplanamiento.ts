import { catchError, fromEvent, map, mergeMap, of, pluck, tap } from "rxjs";
import { ajax } from "rxjs/ajax";


//Helper
const peticionHttpLogin = ( userPass) => 
    ajax.post('https://reqres.in/api/login?delay=1', userPass).pipe(
        pluck('response', 'token'),
        catchError( err => of('xx'))
    )


//creando un formulario 
const from       = document.createElement('from');
const inputEmail = document.createElement('input');
const inputPass  = document.createElement('input');
const submitBtn  = document.createElement('button');

//configuraciones
inputEmail.type = 'email'; 
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password'; 
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar'; 

from.append( inputEmail, inputPass, submitBtn);

document.querySelector('body').append(from);

//Streams

const submitFrom$ = fromEvent<Event>(from, 'submit').pipe(
    tap( ev => ev.preventDefault()),
    map( ev => ({
        email: ev.target[0].value,
        password: ev.target[1].value
    })),
    mergeMap( peticionHttpLogin )
);

submitFrom$.subscribe( token => {
    console.log(token)
});
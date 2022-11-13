import { from, fromEvent, range } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/* range(1,10).pipe(
    filter(val => val % 2 == 1)
).subscribe(console.log); */

range(20,30).pipe(
    filter((val, i) => {
        console.log('index', i+1);
        return val % 2 == 1
    })
)//.subscribe(console.log);

interface personaje {
    tipo: string;
    nombre: string;
}

const personajes: personaje[] = [
    {
        tipo: 'heroe',
        nombre: 'batman'
    },
    {
        tipo: 'heroe',
        nombre: 'robin'
    },
    {
        tipo: 'villano',
        nombre: 'joker'
    }
];

//mi respuesta el ejecicio
from(personajes).pipe(
    filter(val => val.tipo !== 'heroe')
).subscribe( val => console.log('nombre: ', val.nombre));
//respueta de el profesor del curso
from(personajes).pipe(
    filter(p => p.tipo !== 'heroe')
).subscribe( console.log );

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
    map( event => event.key ),
    filter(key => key === 'Enter')
);

keyup$.subscribe(console.log);
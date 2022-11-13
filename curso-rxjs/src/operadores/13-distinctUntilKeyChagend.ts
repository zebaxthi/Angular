import { distinct, distinctUntilChanged, distinctUntilKeyChanged, from, of } from "rxjs";

interface personaje {
    nombre: string
}

const personajes: personaje[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Dr. Willy'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    }
];

from( personajes ).pipe(
    distinctUntilKeyChanged( 'nombre')
).subscribe( console.log);

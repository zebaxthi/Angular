import { distinct, distinctUntilChanged, from, of } from "rxjs";


const numeros$ = of(1,'1',1,3,3,5,5,8,8,4,2,1,2,3,3,4,6,4,3,1, '1');

numeros$.pipe(
    distinctUntilChanged()
).subscribe(console.log);

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
    distinctUntilChanged( (ant, act) => ant.nombre === act.nombre)
).subscribe( console.log);

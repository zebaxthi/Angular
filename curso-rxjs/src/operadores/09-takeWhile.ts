import { fromEvent, map, takeWhile } from 'rxjs';



const click$ = fromEvent<MouseEvent>(document, 'click');


click$.pipe(
    map( ({ x, y }) => ({ x, y })),
    //takeWhile( ({ y }) => y <= 150)
    // toma el ultimo valor y se completa
    takeWhile( ({ y }) => y <= 150, true)
).subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
});
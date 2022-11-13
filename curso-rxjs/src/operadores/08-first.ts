import { first, fromEvent, map, take, tap } from 'rxjs';


const click$ = fromEvent<MouseEvent>(document, 'click');


click$.pipe(
    tap<MouseEvent>( console.log ),
/*     map( event => ({
        clientX: event.clientX,
        clientY: event.clientY
    }) ), */

    map(({clientX, clientY}) => ({ clientX, clientY})),

    first( event => event.clientY >= 150 )
).subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
});
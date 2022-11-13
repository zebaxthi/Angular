import { auditTime, fromEvent, map, tap } from "rxjs";

const click$ = fromEvent<MouseEvent>( document, 'click');


click$.pipe(
    map( ( { x } ) => x),
    tap( val => console.log('tap', val)),
    auditTime(3000)
).subscribe(console.log);
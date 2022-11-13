import { asyncScheduler, distinctUntilChanged, fromEvent, pluck, throttleTime } from "rxjs";


const click$ = fromEvent( document, 'click');

click$.pipe(
    throttleTime(3000)
)//.subscribe( console.log );

//ejemplo 2

const input = document.createElement('input');
document.querySelector('body').append( input );


const input$ = fromEvent<KeyboardEvent>( input, 'keyup');

input$.pipe(
    throttleTime(100, asyncScheduler, {
        leading: false,
        trailing: true
    }),
    pluck('target', 'value'),
    distinctUntilChanged()
).subscribe( console.log ); 
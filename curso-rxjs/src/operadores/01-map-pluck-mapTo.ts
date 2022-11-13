import { fromEvent, range } from 'rxjs';
import { map, mapTo, pluck } from 'rxjs/operators';



/* range(1,5).pipe(
    map<number, string>( val => (val * 10).toString())
).subscribe(console.log); */


const keyup$ = fromEvent<KeyboardEvent >(document, 'keyup');

const keyupCode$ = keyup$.pipe(
    map( event => event.code)
);

const keyupPluck$ = keyup$.pipe(
    pluck('target', 'baseURI')
);

const keyupMapTo$ = keyup$.pipe(
    mapTo('tecla presionada')
);

keyup$.subscribe(console.log);
keyupCode$.subscribe(code =>  console.log('map', code) );
keyupPluck$.subscribe(key =>  console.log('pluck', key) );
keyupMapTo$.subscribe(mapTo =>  console.log('mapTo', mapTo) );

//keyup$.pipe(map(event => event.code)).subscribe( code => console.log('map', code));
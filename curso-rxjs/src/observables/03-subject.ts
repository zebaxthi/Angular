import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('siguiente: ', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('completado: ')
};

const intervalo$ = new Observable<number> ( subs => {
   
    const intervalNum = setInterval(
        () => subs.next( Math.random() ), 1000
    );

    return ( () => {
        clearInterval(intervalNum);
        console.log('intervalo destruido');
    });
});

/* Subject 
    1- Casteo multiple
    2- tambien es observer
    3- next, error, complete
*/

const subject$ = new Subject();
const intervalSubject = intervalo$.subscribe( subject$);

/* const subs1 = intervalo$.subscribe( rnd => console.log('subs1: ', rnd));
const subs2 = intervalo$.subscribe( rnd => console.log('subs2: ', rnd)); */

const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );

setTimeout( () => {

    subject$.next(10);

    subject$.complete();

    intervalSubject.unsubscribe();
    
}, 3500);
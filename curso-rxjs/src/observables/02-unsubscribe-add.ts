import { Observable, Observer, Subscriber } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('siguiente: ', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('completado: ')
};

const intervalo$ = new Observable<number>(Subscriber => {

    //Crear un contador, 1,2,3,4,5...
    let num = 0;

    const interval = setInterval( () => {
        //cada segundo 
        num++;
        Subscriber.next(num);
        console.log(num);
    }, 1000);

    setTimeout(() => {
        Subscriber.complete();
    }, 2500);

    return () => {
        clearInterval(interval);
        console.log('intervalo destruido');
    }
});

const subs1 = intervalo$.subscribe( observer);
const subs2 = intervalo$.subscribe( observer);
const subs3 = intervalo$.subscribe( observer);

subs1.add( subs2 );
subs1.add( subs3 );  

setTimeout(() => {
    subs1.unsubscribe()
    //subs2.unsubscribe()
    //subs3.unsubscribe()

    console.log('completado timeout')
}, 6000);
( () => {

    const sumar = ( a: number, b: number): number => a + b;

    const nombre = (): string => 'Hola mundo';

    const obtenerSalario = () => {

        return new Promise<string>( (resolve, reject) => {
            resolve('refactory');
        });
    }

    obtenerSalario().then( a => console.log( a.toUpperCase() ));


})();


( () => {

    const avenger = {
        nombre: 'Steve',
        clave: 'capitan america',
        poder: 'droga'
    }

    const extraer = ( { nombre, poder }: any ) => {

        //const { nombre, poder } = averger;    

        console.log( nombre );
        console.log( poder );
    }
     

    extraer( avenger );

    const avengers: string[] = ['Thor', 'Ironman', 'Spiderman'];

    // const [ , , spiderman ] = avengers;

    // console.log( thor );
    // console.log( ironman );
    // console.log( spiderman );

    const extraerArr = ( [thor, ironman, spiderman]: string[] ) => {
        console.log( thor );
        console.log( ironman );
        console.log( spiderman );
    }

    extraerArr( avengers );




})();


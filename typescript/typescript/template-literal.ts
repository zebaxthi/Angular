(function(){

    function getEdad(){
        return 100 + 100 + 300
    }

    const nombre = 'sebastian';
    const apellido = 'aguirre';
    const edad = 20;

    //const salida = nombre + " " + apellido + "( " + edad + " )";

    const salida = `${nombre} \n${apellido} \n( ${getEdad()} )`;

    console.log(salida);

})();


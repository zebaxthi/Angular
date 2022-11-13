export class HeroeModel {
    id?: string;
    nombre = '';
    poder = '';
    vivo: boolean;

    constructor(){
        this.vivo = true;
    }

}
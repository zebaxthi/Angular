import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre: string = 'Capitán América';
  nombre2: string = 'SeBaStIaN aGuIrRe GiL';
  personajes: string[] = ['Ironman', 'Spiderman', 'Thor', 'Loki', 'Groot'];
  PI: number = Math.PI;
  porcentaje: number = 0.235;
  salario: number = 1234.5;
  fecha: Date = new Date();
  activar: boolean = true;

  idioma:  string = 'es';
  videoURL: string = 'https://www.youtube.com/embed/iT4UOkyI09k';
  
  valorPromesa = new Promise( (resolve) => {

    setTimeout( () =>{
      resolve('llego la data');
    }, 4500);

  });

  heroe = {
    nombre: 'Logan',
    clave: 'Wolverine',
    edad: 500,
    direccion: {
      calle: 'primera',
      casa: 20
    }
  }

}

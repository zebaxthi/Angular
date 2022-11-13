import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: string, activar: boolean): string{
    if(activar){
      let letters = value.split('');
      for(let i in letters){
          letters[i] = '*';
      }
      value = letters.join('');
     }
     return value;
  }
}

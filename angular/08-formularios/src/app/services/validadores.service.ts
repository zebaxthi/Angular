import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  existeUsuario( control: FormControl): Promise<any> | Observable<any> {

    if(!control.value){
      return Promise.resolve(null); 
    }

    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        if( control.value === 'setreri'){
          resolve({existe: true});
        } else {
          resolve( null );
        }
      }, 3500);
    });
  }

  noHerrera( control: FormControl): {[s:string]: boolean} | null{
    
    if( control.value?.toLowerCase() === 'herrera'){
      return {
        noHerrera: true
      }  
    }
    return null;
  }

  passwordsIguales(pass1: string, pass2: string){
    

    return ( fromGroup : FormGroup) => {
      const pass1Control = fromGroup.controls[pass1];
      const pass2Control = fromGroup.controls[pass2];
      if(pass1Control === pass2Control){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }



}

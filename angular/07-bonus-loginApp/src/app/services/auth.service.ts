import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyBEM9JO9pLoxekTLpiQVqiklFjyXEBtN0U';
  userToken: string;
  
  // Crear nuevos ususarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) { 
    this.userToken = this.leerToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.apiKey}`, authData);
  }

  nuevoUsuario(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}/accounts:signUp?key=${this.apiKey}`, authData)
                .pipe( 
                  map( resp => {
                    console.log('Entro al mapa del rxjs')
                    this.guardarToken( resp['idToken']);
                    return resp;  
                  })
                );
  }

  guardarToken( idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean{
    if(this.userToken.length < 2){
      return false;
    } 

    const espira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(espira);

    if(expiraDate > new Date()){
      return true;
    } else {
      return false;
    }

  }
}

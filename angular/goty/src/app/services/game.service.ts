import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  juegos: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominados(){
    if( this.juegos.length > 0){
      console.log('Desde cache');
      return of(this.juegos);
    } else {
      console.log('Desde desde internet');
      return this.http.get<Game[]>(`${environment.url}/api/goty`).pipe( tap( juegos => this.juegos = juegos) );
    }
  }

  votarJuego( id: string){
    return this.http.post(`${environment.url}/api/goty/${id}`, {}).pipe( catchError( err => of(err.error) ) );
  }
  
}

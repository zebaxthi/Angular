import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../../interfaces/cartelera-response';
import { MovieResponse } from '../../interfaces/movie-response';
import { CreditResponse } from '../../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

   private baseUrl = 'https://api.themoviedb.org/3';
   private carteleraPage = 1;
   public cargando: boolean = false;

  constructor( private http: HttpClient) { }

  get params(){
    return {
      api_key: 'e0266df02c04ff4052932bf32338d53b',
      language: 'es-ES',
      page: this.carteleraPage
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]>{

    if(this.cargando){ return of([]); }

    this.cargando = true;  
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {params: this.params}).pipe(map( (resp) => resp.results), tap( resp => {
      this.carteleraPage += 1;
      this.cargando = false;
    }))
  }

  buscarPeliculas( query: string): Observable<Movie[]>{

    const params = {...this.params, page: 1, query};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(map(resp => resp.results));
  }

  getDetails(id: string){
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
      )
    }
    
    getCast(id: string){
      return this.http.get<CreditResponse>(`${this.baseUrl}/movie/${id}/credits`, {
        params: this.params
      }).pipe( 
        map( resp => resp.cast),
        catchError( err => of([])));
  }

}

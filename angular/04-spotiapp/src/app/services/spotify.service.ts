import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  http: any;

  constructor( private htpp: HttpClient) { 
    console.log('Spotify service listo');
  }

  getToken() {
    const client_id = '8420d7f1bb0f4180be907986ddd7d4cd';
    const client_secret = '87e5de95ea9a4bc8869929fcd334dcaa';
 
    const url = `https://spotify-gera.herokuapp.com/token/${client_id}/${client_secret}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   debugger;
    const prom = this.htpp.get(url);
    return prom;
  }

  getQuery(query: string) {
    return this.getToken().pipe(switchMap( (resp: any) => {
      const url = `https://api.spotify.com/v1/${query}`;
      const headers = new HttpHeaders({
      Authorization: `Bearer ${resp.access_token}`,
      'Content-Type': 'application/json'
    });
    console.log(this);
      return this.http.get(url, {headers}); 
    }));

  }

  getNewReleases() {
    const obs = this.getQuery('browse/new-releases?limit=20');
    return obs.pipe(map((data: any) => data.albums.items));
 }

  getArtists( termino: string){
    const obs = this.getQuery(`search?q=${termino}&type=artist&limit=50`);
    return obs.pipe( map((data: any) => data.artists.items));
  }

  getArtist( id: string){
    return this.getQuery(`artists/${id}`);
              //.pipe( map((data: any) => data.artist.items));
  }

  getTopTracks( id: string){
    const obs = this.getQuery(`artists/${id}/top-tracks?country=us`)
    return obs.pipe( map( (data: any) => data.tracks));
  }

}

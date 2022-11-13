import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  artists: any[] = []; 
  loading: boolean = true;

  constructor( private spotify : SpotifyService) { }
  
  async buscar( termino : string){

    this.loading = true;

    console.log(termino);
    (await this.spotify.getArtists(termino))
      .subscribe( (data: any) => {
        console.log(data);
        this.artists = data;
        this.loading = false;
      });
  }

}

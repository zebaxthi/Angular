import { Component } from '@angular/core';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [
  ]
})
export class ArtistComponent {

  artist: any= {}; 
  loading: boolean = true;
  topTracks: any[] = [];

  constructor( private router: ActivatedRoute,
              private spotify: SpotifyService) {
    this.router.params.subscribe( params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  async getArtist(id: string) {
    this.loading = true;
    const obs = await this.spotify.getArtist(id);
    obs.subscribe((artist: any) => {
      this.loading = false;
      this.artist = artist;
    });
  }

  async getTopTracks( id: string){
    const obs = (await this.spotify.getTopTracks( id ))
      .subscribe( (topTracks: any[]) => {
        console.log(topTracks);
        this.topTracks = topTracks;
      });
  }


}

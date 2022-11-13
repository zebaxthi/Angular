import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string = '';

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
  }
 
  ngOnInit() {
    this.getNewReleases();
  }
 
  getNewReleases() {
    this.spotify.getNewReleases()
     .subscribe((data: any) => {
      this.loading = false;
      this.nuevasCanciones = data;
     })
  }


}

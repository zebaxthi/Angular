import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public peliculas: Movie[] = [];
  public peliculasSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if(pos > max){

      if(this.peliculasService.cargando ){ return; }

      this.peliculasService.getCartelera().subscribe( peliculas => {
        this.peliculas.push(...peliculas);
      });
    }
  }

  constructor( private peliculasService: PeliculasService) { }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe( peliculas => {
      this.peliculas = peliculas;
      this.peliculasSlideShow = peliculas;
    });
  }

}

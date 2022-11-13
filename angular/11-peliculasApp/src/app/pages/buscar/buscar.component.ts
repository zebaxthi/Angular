import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  peliculas: Movie[] = [];
  textoBuscado: string = '';

  constructor( private ActivatedRoute: ActivatedRoute, private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe( params => {
      this.textoBuscado = params['texto'];
      this.peliculasService.buscarPeliculas( params['texto']).subscribe(peliculas => this.peliculas = peliculas);
    });
  }

}

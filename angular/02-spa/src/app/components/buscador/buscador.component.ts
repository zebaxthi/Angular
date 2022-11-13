import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'
})
export class BuscadorComponent implements OnInit {

   heroes:any[] = [];
   index: number = -1;
  termino: string = '';

  constructor( private activatedRoute: ActivatedRoute,
               private _heroesService: HeroesService,
               private router: Router) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params => {
      this.termino = params['termino'];  
      this.heroes = this._heroesService.buscarHeroes( this.termino );
      console.log(this.heroes);
    })
    
  }

}

import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  heroe: any  = {};
  

  constructor( private activatecRoute: ActivatedRoute,
               private _heroeService: HeroesService) { 
    this.activatecRoute.params.subscribe( params => {
      this.heroe = this._heroeService.getHeroe( params['id']);
    });
    
  }

  ngOnInit(): void {
  }


  

}

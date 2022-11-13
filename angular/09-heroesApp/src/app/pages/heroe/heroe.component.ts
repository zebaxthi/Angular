import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute, private redirigir: Router) {
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')?.toString();
    if( id !== 'nuevo'){
      this.heroesService.getHeroe( id || '' ).subscribe( (resp: any) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  Guardar( form: NgForm ){

    if( form.invalid){
      console.log('formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if( this.heroe.id ){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success',
        showConfirmButton: true
      }).then( resp => {
        if(resp){
          this.redirigir.navigateByUrl('/heroes'); 
        }
      });
    });
  }

}

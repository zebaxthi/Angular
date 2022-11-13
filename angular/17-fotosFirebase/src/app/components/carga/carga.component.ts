import { Component, OnInit } from '@angular/core';
import { FileItem } from '../models/file-items.model';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  estaSobreElemento: boolean = false;
  archivos: FileItem[] = [];

  constructor(public  _cargaImagenes: CargaImagenesService) { }

  ngOnInit(): void {
  }

  cargarImagenes(){
    this._cargaImagenes.cargarImagenesFirebase( this.archivos );
  }

  limpiarArchicos(){
    this.archivos = [];
  }

}

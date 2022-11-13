import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  paises: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://restcountries.com/v2/lang/es').subscribe( resp => this.paises = resp)
  }

  drop(evento: CdkDragDrop<any>){
    console.log('ok', evento)
    moveItemInArray(this.paises, evento.previousIndex, evento.currentIndex);
  }

}

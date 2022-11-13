import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromMensaje from './mensaje.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dato$!: Observable<any>;

  constructor( private store: Store<any>){
    this.dato$ = store.select('mensaje');
  }

  spanishMensaje(){
    this.store.dispatch( new fromMensaje.SpanishMensaje('Los colores'));
  }
  
  EnglishMensaje(){
    this.store.dispatch( new fromMensaje.EnglishMensaje('yellow'));
  }

}

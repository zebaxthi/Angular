import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pagina1Component } from './pages/pagina1/pagina1.component';
import { Pagina2Component } from './pages/pagina2/pagina2.component';
import { Pagina3Component } from './pages/pagina3/pagina3.component';

const routes: Routes = [
  {path: 'pagina1', component: Pagina1Component},
  {path: 'pagina2', component: Pagina2Component},
  {path: 'pagina3', component: Pagina3Component},
  {path: '**', component: Pagina1Component},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

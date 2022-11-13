import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: 'template', component: TemplateComponent},
  {path: 'reactivo', component: ReactiveComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'reactivo'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

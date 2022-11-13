import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
  }

  onSubmit( from: NgForm){
    if (from.invalid){ return; }
    Swal.fire({  allowOutsideClick: false, icon: 'info', text: 'Espera por Favor..'}); 
    Swal.showLoading();
    this.auth.nuevoUsuario(this.usuario).subscribe( resp => {
      console.log(resp);
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({  icon: 'error', text: err.error.error.message});
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login( from: NgForm){
    if (from.invalid){ return; }
    Swal.fire({  
       allowOutsideClick: false, 
       icon: 'info', 
       text: 'Espera por Favor..'
     }); 
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe( resp => {
      console.log(resp);
      Swal.close();
      this.auth.guardarToken(resp['idToken']);
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({  icon: 'error', text: err.error.error.message});
    });
  }

}

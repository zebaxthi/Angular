import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Mensaje } from '../interfaces/chat.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection!: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  usuario: any = {};

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) { 
    this.auth.authState.subscribe( user => {
      console.log('Estado del usuario', user);
      if(!user){
        return
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login( proveedor: string) {
    if(proveedor == 'google'){
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.auth.signOut();
  }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'asc').limitToLast(5));

    return this.itemsCollection.valueChanges().pipe(map( (mensajes: Mensaje[]) => {
      console.log(mensajes);
      this.chats = mensajes;
    }));

  }

  agregarMensaje( texto: string){
    //falta el uid del usuario
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemsCollection.add(mensaje);
  }

}

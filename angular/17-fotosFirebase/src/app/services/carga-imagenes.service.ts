import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileItem } from '../components/models/file-items.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  // cargarImagenesFirebase( imagenes: FileItem[]){
  //   for( let item of imagenes){
  //     item.estaSubiendo = true;
  //     const storageRef = this.storage.ref(item.nombreArchivo);
  //     if( item.progreso >= 100){
  //       continue;
  //     }
  //     const uploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);
  //     uploadTask.snapshotChanges().subscribe( snap => {
  //       item.progreso = Number(snap?.bytesTransferred) / Number(snap?.totalBytes) * 100;
  //       snap?.ref.getDownloadURL().then(resp => item.url = resp);
  //       item.estaSubiendo = false;
  //       this.guardarImagen({
  //         nombre: item.nombreArchivo,
  //         url: item.url
  //       });
  //     },
  //       err => console.log('error al subir ', err),
  //     );
  //   }
  // }

  cargarImagenesFirebase( imagenes: FileItem[] ): void {
 
    for (let item of imagenes) {
 
      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }
 
      const file = item.archivo;
      const filePath = `${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`;
      const fileRef = this.storage.ref( filePath );
      const uploadTask = this.storage.upload(filePath, file);
 
      uploadTask.percentageChanges().subscribe( resp => item.progreso = Number(resp));

      uploadTask.snapshotChanges().pipe(
        finalize(
          () => fileRef.getDownloadURL().subscribe( url => {
            console.log('Imagen cargada con exito');
            item.url = url;
            item.estaSubiendo = false;
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url
            });
          })
        )
      ).subscribe();
    }
  }
  
  private guardarImagen(imagen: { nombre: string, url: string}) {
    this.afs.collection(`/${this.CARPETA_IMAGENES}`).add( imagen );
  }
}

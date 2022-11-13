import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-targetas',
  templateUrl: './targetas.component.html',
  styleUrls: ['./targetas.component.css']
})
export class TargetasComponent {

  @Input() items: any[] = []; 

  constructor( private router: Router) { }


  verArtist( item: any){
    let artistId;

    if( item.type === 'artist'){
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }

    this.router.navigate(['/artist', artistId]);
  }
}

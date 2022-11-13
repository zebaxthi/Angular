import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private domSnitizer: DomSanitizer) {
    
  }

  transform(value: string, ...args: unknown[]): SafeResourceUrl {
    return this.domSnitizer.bypassSecurityTrustResourceUrl( value );
  }

}

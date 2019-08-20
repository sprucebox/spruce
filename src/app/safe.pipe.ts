import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
constructor(protected sanitizer: DomSanitizer) {}
  transform(url) {
 return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

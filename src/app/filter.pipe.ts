import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchtext: string): any[] {
    if(!items) return [];
    if(!searchtext) return items;
searchtext = searchtext.toLowerCase();
return items.filter( it => 
    it.email.toLowerCase().indexOf(searchtext.toLowerCase()) !==-1
    );
   }
}
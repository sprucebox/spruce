import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe  implements PipeTransform {
  transform(items: any[], namesearch: string): any[] {
    if(!items) return [];
    if(!namesearch) return items;
namesearch = namesearch.toLowerCase();
return items.filter( it => 
    it.project_name.toLowerCase().indexOf(namesearch.toLowerCase()) !==-1
    );
   }
}
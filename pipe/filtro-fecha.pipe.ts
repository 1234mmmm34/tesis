import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFecha'
})
export class FiltroFechaPipe implements PipeTransform {


  transform(value: any, campo: string, ...args: any[]): any {
    if(!value) return null;
    if(!args) return value;
    console.log("value ", args, value)

   // if(args===value)
    return value.filter((singleItem: { [x: string]: { toLowerCase: () => any[][]; }; }) => singleItem[campo].toLowerCase().includes(args));
  }


} 

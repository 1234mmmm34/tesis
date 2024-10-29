import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuarios'
})
export class FiltroUsuariosPipe implements PipeTransform {

  transform(value: any, campo: string, ...args: any[]): any {
    if(!value) return null;
    if(!args) return value;
    
    return value.filter((singleItem: { [x: string]: { toLowerCase: () => any[][]; }; }) => singleItem[campo].toLowerCase().includes(args));
  }
}

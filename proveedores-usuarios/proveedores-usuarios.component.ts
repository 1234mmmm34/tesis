import { Component } from '@angular/core';
import { Proveedor } from '../proveedores/proveedor.model';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-proveedores-usuarios',
  templateUrl: './proveedores-usuarios.component.html',
  styleUrls: ['../consulta.css']
})
export class ProveedoresUsuariosComponent {
  idFraccionamiento: number =0;
  proveedores: Proveedor[] = [];
  

  constructor(private ProveedoresService: ProveedoresService,private dataService:DataService) {}

  ngOnInit(): void {
    //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
    //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    this.idFraccionamiento = this.dataService.obtener_usuario(3);
    //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
    //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    this.cargarProveedores(this.idFraccionamiento);
  }
  cargarProveedores(idFraccionamiento: number): void {
    this.ProveedoresService.consultarProveedores(idFraccionamiento).subscribe(
      (data: Proveedor[]) => {
        this.proveedores = data;
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }

  

}

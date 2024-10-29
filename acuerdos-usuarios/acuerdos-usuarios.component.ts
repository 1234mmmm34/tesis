import { Component } from '@angular/core';
import { Acuerdos } from '../modelos/acuerdos';
import { AcuerdosService } from '../consultar-acuerdos/acuerdos.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-acuerdos-usuarios',
  templateUrl: './acuerdos-usuarios.component.html',
  styleUrls: ['./acuerdos-usuarios.component.css']
})
export class AcuerdosUsuariosComponent {

  acuerdos: Acuerdos[] = [];
  filtroAcuerdos: '' | undefined;
  acuerdos1: Acuerdos[] = [];
  filtroFecha: '' | undefined;

  indice: number = 0;
  verdaderoRango: number = 6;
  cont: number = 1;

  constructor(private acuerdosService: AcuerdosService, private dataService: DataService) { }

  ngOnInit(): void {
    this.consultarAcuerdos();
  }
  /*
    consultarAcuerdos(): void { 
      const idFraccionamiento = this.dataService.obtener_usuario(3); 
      this.acuerdosService.consultarAcuerdos(idFraccionamiento).subscribe(
        (data: Acuerdos[]) => {
          this.acuerdos = data;
          console.log("veamos: ",this.acuerdos1); 
        },
        (error) => {
          console.error('Error al obtener acuerdos:', error);
          // Manejo de errores
        }
      );
    }
  */


  consultarAcuerdos(): void {
    const idFraccionamiento = this.dataService.obtener_usuario(3);

    this.acuerdosService.consultarAcuerdosPaginados(idFraccionamiento, 0, 100).subscribe(
      (data: Acuerdos[]) => {

        if (data.length != 0) {

          this.acuerdos = data;
          this.acuerdos1 = this.acuerdos.slice(this.indice, this.indice + this.verdaderoRango);


        }
      });
  }


}

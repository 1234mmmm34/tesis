import { Component } from '@angular/core';
import { Egresos } from './egresos.model';
import { EgresosService } from './egresos.service';
import { Proveedor } from '../proveedores/proveedor.model';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { DataService } from '../data.service';
import Swal from 'sweetalert2'
import { LoadingService } from '../loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent {
  id_fraccionamiento: number=0;
  proveedores: Proveedor[]=[];
  egresos: Egresos[]=[];
  idEgreso: number=0;
  mostrarGrid: boolean = false;
  //
  egresoModel: Egresos = {
    id_egreso: 0, 
    concepto: '',
    descripcion: '',
    proveedor: '',
    monto: '',
    fecha: ''
  };
  //
  constructor(private egresoService:EgresosService, private proveedoresService:ProveedoresService, private dataService:DataService, private loadingService: LoadingService){ }

  ngOnInit():void{
    this.id_fraccionamiento=this.dataService.obtener_usuario(3);
    this.cargarProveedores();
    this.consultarEgresos(this.id_fraccionamiento);

  }

  consultarEgresos(idFraccionamiento: number) {

    this.loadingService.show();
    
    this.egresoService.consultarEgresos(idFraccionamiento).subscribe(
      (data: Egresos[]) => {
        console.log('Egresos consultados:', data);
        this.egresos=data;

        this.mostrarGrid = true;
        this.loadingService.hide();
      },
      (error) => {
        console.error('Error al consultar egresos:', error);
        Swal.fire({
          title: 'Error al consultar egresos',
          text: 'Consulte al administrador de la pagina',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }


  agregarEgreso() {
    const { concepto, descripcion, proveedor, monto,fecha } = this.egresoModel;
  
    this.egresoService.agregarEgreso(this.dataService.obtener_usuario(3), concepto, descripcion, proveedor, monto, fecha).subscribe(
      (result: boolean) => {
        if (result) {
          console.log('Egreso agregado correctamente');
          this.consultarEgresos(this.id_fraccionamiento);
          this.limpiarCampos();
          Swal.fire({
            title: 'Egreso agregado',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          console.error('Error al agregar egreso');
          Swal.fire({
            title: 'Error al agregar egreso',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        console.error('Error al agregar egreso:', error);
        Swal.fire({
          title: 'Error al agregar egreso',
          text: '',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  eliminarEgreso(idEgreso: number) {
    this.egresoService.eliminarEgreso(idEgreso, this.id_fraccionamiento).subscribe(
      (result: boolean) => {
        if (result) {
          console.log('Egreso eliminado correctamente');
          this.consultarEgresos(this.id_fraccionamiento);
          Swal.fire({
            title: 'Egreso eliminado correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.limpiarCampos();
        } else {
          console.error('Error al eliminar egreso');
          Swal.fire({
            title: 'Error al eliminar egreso',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        console.error('Error al eliminar egreso:', error);
        Swal.fire({
          title: 'Error al eliminar egreso',
          text: '',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  actualizarEgreso() {
    const { concepto, descripcion, proveedor, monto,fecha } = this.egresoModel;
    this.egresoService.actualizarEgreso(this.idEgreso, this.id_fraccionamiento, concepto,descripcion,proveedor,monto,fecha).subscribe(
      (result: boolean) => {
        if (result) {
          console.log('Egreso actualizado correctamente');
          this.consultarEgresos(this.id_fraccionamiento);
          Swal.fire({
            title: 'Egreso actualizado correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.idEgreso=0;
          this.limpiarCampos();
        } else {
          console.error('Error al actualizar egreso');
          Swal.fire({
            title: 'Error al actualizar egreso',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        console.error('Error al actualizar egreso:', error);
        Swal.fire({
          title: 'Error al actualizar egreso',
          text: '',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  //metodo para cargar proveedores del fraccionamienti
  cargarProveedores(): void {

    this.proveedoresService.consultarProveedores(this.id_fraccionamiento).subscribe(
      (data: Proveedor[]) => {
        this.proveedores = data;
  
        

      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }
  //fin del metodo para cargar proveedores


  limpiarCampos() {
    this.egresoModel = {  
      id_egreso:0,      
      proveedor: '',
      monto: 0,
      concepto: '',
      fecha: '',
      descripcion: ''
    };
  }

  seleccionarEgreso(EgresoSeleccionado: Egresos){
    const fechaFormateada = this.formatoFecha(EgresoSeleccionado.fecha);
    this.egresoModel = {  
      id_egreso:EgresoSeleccionado.id_egreso,      
      proveedor: EgresoSeleccionado.proveedor,
      monto: EgresoSeleccionado.monto,
      concepto: EgresoSeleccionado.concepto,
      fecha: fechaFormateada,
      descripcion: EgresoSeleccionado.descripcion
    };
    this.idEgreso=EgresoSeleccionado.id_egreso;
  }
  formatoFecha(fecha: string): string {
    // '16/01/2024 12:00:00 a. m.' -> '2024-01-16'
    const partesFecha = fecha.split(' ')[0].split('/');
    return `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
  }
}
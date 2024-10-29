import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProveedoresService } from './proveedores.service';
import { Proveedor } from './proveedor.model';
import { DataService } from '../data.service';
import Swal from 'sweetalert2'
import { LoadingService } from '../loading-spinner/loading-spinner.service';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html', 
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  idFraccionamiento: number | undefined;
  respuestaProveedores: string | null = null;
  proveedores: Proveedor[] = [];
  id_proveedor:number=0;
  mostrarGrid: boolean = false;
  
  constructor(private ProveedoresService: ProveedoresService, private dataservice:DataService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.proveedorModel.idFraccionamiento=this.dataservice.obtener_usuario(3);
    this.cargarProveedores(this.dataservice.obtener_usuario(3));
  }

  agregarProveedor(formulario: any): void {
    const idFraccionamiento = this.dataservice.obtener_usuario(3); //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
    //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    const nombre = formulario.nombre;
    const apellidoPaterno = formulario.apellido_Paterno;
    const apellidoMaterno = formulario.apellido_Paterno;
    const telefono = formulario.telefono; 
    const tipo = formulario.tipo;
    const direccion = formulario.direccion;
    const funcion = formulario.funcion;
  
    this.ProveedoresService.agregarProveedor(idFraccionamiento,nombre,apellidoPaterno,apellidoMaterno,telefono,tipo,direccion,funcion
      ).subscribe(
      (respuesta: boolean) => {
        //this.respuestaProveedores=respuesta;
        this.cargarProveedores(this.dataservice.obtener_usuario(3));
        console.log('Respuesta:', respuesta);
      },
      (error) => {
        console.error('Error al agregar proveedor Angular:', error);
        // Manejo de errores
      }
    );
    this.limpiarCampos();
    
  }


  cargarProveedores(idFraccionamiento: number): void {
    this.loadingService.show();
    this.ProveedoresService.consultarProveedores(this.dataservice.obtener_usuario(3)).subscribe(
      (data: Proveedor[]) => {
        this.proveedores = data;
        this.mostrarGrid = true;
        this.loadingService.hide();


      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
        Swal.fire({
          title: 'Error al obtener proveedores',
          text: 'Consulte al administrador de la pagina '+ error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  eliminarProveedor(idProveedor: number): void {
    const idFraccionamiento = this.dataservice.obtener_usuario(3); 
  
    this.ProveedoresService.eliminarProveedor(idFraccionamiento, idProveedor).subscribe(
      (respuesta: boolean) => {
        console.log('Respuesta:', respuesta);
        //this.respuestaProveedores=respuesta;
        this.cargarProveedores(idFraccionamiento); 

        Swal.fire({
          title: 'Proveedor eliminado correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        console.error('Error al eliminar proveedor:', error);
        Swal.fire({
          title: 'Error al eliminar proveedor',
          text: 'Consulte al administrador de la pagina '+ error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        
      }
    );
    this.cargarProveedores(this.dataservice.obtener_usuario(3));
  }

  actualizarProveedor(formulario: any): void {
    const idFraccionamiento = this.dataservice.obtener_usuario(3); 
    const nombre = formulario.nombre;
    const apellidoPaterno = formulario.apellido_Paterno;
    const apellidoMaterno = formulario.apellido_Paterno;
    const telefono = formulario.telefono;
    const tipo = formulario.tipo;
    const direccion = formulario.direccion;
    const funcion = formulario.funcion;
    this.ProveedoresService.actualizarProveedor(this.id_proveedor, idFraccionamiento, nombre, apellidoPaterno, apellidoMaterno, telefono, tipo, direccion, funcion)
      .subscribe(
        (respuesta: boolean) => {
          if (respuesta) {
            this.id_proveedor=0;
            this.limpiarCampos();
            console.log('Proveedor actualizado correctamente');
            this.cargarProveedores(idFraccionamiento);

            Swal.fire({
              title: 'Proveedor actualizado correctamente',
              text: '',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            
            
          } else {
            console.error('Error al actualizar proveedor');
            Swal.fire({
              title: 'Error al actualizar proveedor',
              text: '',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          Swal.fire({
            title: 'Error en la consulta',
            text: 'Consulte al administrador d ela pagina',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
  }



  //Cargar los datos del proveedor seleccionado 
  proveedorModel = {
    idFraccionamiento: '',
    nombre: '',
    apellido_Paterno: '',
    apellido_Materno: '',
    telefono: '',
    tipo: '',
    direccion: '',
    funcion: ''
  };
  @ViewChild('proveedorForm', { static: false }) proveedorForm!: ElementRef<HTMLFormElement>;

  cargarDatosProveedor(proveedorSeleccionado: Proveedor) {
   
    this.proveedorModel = {
      idFraccionamiento: String(this.dataservice.obtener_usuario(3)),
      nombre: proveedorSeleccionado.nombre,
      apellido_Paterno: proveedorSeleccionado.apellido_paterno,
      apellido_Materno: proveedorSeleccionado.apellido_materno,
      telefono: proveedorSeleccionado.telefono,
      tipo: proveedorSeleccionado.tipo,
      direccion: proveedorSeleccionado.direccion,
      funcion: proveedorSeleccionado.funcion
    };

    this.id_proveedor=proveedorSeleccionado.id_proveedor;
  }
 
  limpiarCampos(){
    this.proveedorModel = {
      idFraccionamiento: String(this.dataservice.obtener_usuario(3)),
      nombre: '',
      apellido_Paterno: '',
      apellido_Materno: '',
      telefono: '',
      tipo: '',
      direccion: '',
      funcion: ''
    };
  }


  
}


/*

<a class="btn btn-sm text-white btn-success" style="margin-right: auto;">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true" (click)="cargarDatosProveedor(proveedor)"></span>
            </a>

          */



/*

      <a class="btn btn-sm text-white btn-success" style="margin-right: auto;">
            <span class="glyphicon glyphicon-remove" aria-hidden="false" (click)="eliminarProveedor(proveedor.id_proveedor)"></span>
            </a>


*/
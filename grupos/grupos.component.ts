import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { GruposService } from './grupos.service'
import { Grupos } from '../modelos/grupos'
import { LoadingService } from '../loading-spinner/loading-spinner.service';
import Swal from 'sweetalert2';
import { usuarios } from '../modelos/grupos';
import * as $ from 'jquery';
import 'select2';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent{
 
  Grupos: Grupos[] = [];
  usuarios: usuarios[] = [];
  miembros: usuarios[] = [];
  filtroUsuarios: "" | undefined;
  id_persona: number = 0;
  mostrarEditar: boolean = false;

  grupo = {
    nombre: '',
    descripcion: '',
    usuarios: 0,
    id_fraccionamiento: this.dataService.obtener_usuario(1)
  };

  seleccionados: { 
    id_persona: number,
    id_grupo: number, 
    nombre: string, 
    apellido_pat: string, 
    apellido_mat: string }[] = [];




  ngOnInit(){
    //this.fetchDataDeudores();
    this.ConsultarGrupos();


  }
 


  constructor(private http: HttpClient, private dataService: DataService, private gruposService: GruposService, private loadingService: LoadingService){}

  
  ConsultarGrupos(){
    this.gruposService.consultarGrupos(this.dataService.obtener_usuario(1)).subscribe(
      (Grupos: Grupos[]) => {
      console.log(Grupos)
      this.Grupos = Grupos;
 
      }, 
      (error) => {
        // Manejo de errores
        console.error('Error:', error);
      }
    );
  }

  ConsultarGrupo(id_grupo: any){

    this.mostrarEditar = true;

    this.grupo.descripcion = this.Grupos[id_grupo-1].descripcion;
    this.grupo.usuarios = this.Grupos[id_grupo-1].usuarios;
    this.grupo.nombre = this.Grupos[id_grupo-1].nombre;

    this.grupo.id_fraccionamiento = id_grupo;
  }

  
  EliminarMiembro(id_miembro: any, nombre: any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al  miembro "${nombre}"? los cambios no se podrán revertir`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gruposService.eliminarMiembro(id_miembro).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El miembro ha sido eliminado.',
              'success'
            );
            location.reload()
            // Opcional: Actualiza la lista o realiza otras acciones después de eliminar
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el miembro.',
              'error'
            );
          }
        });
      }
    });


  }

  EliminarGrupo(id_grupo: any, nombre_grupo: any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el grupo "${nombre_grupo}"? los cambios no se podrán revertir`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gruposService.eliminarGrupo(id_grupo).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El grupo ha sido eliminado.',
              'success'
            );
            // Opcional: Actualiza la lista o realiza otras acciones después de eliminar
            this.ConsultarGrupos();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el grupo.',
              'error'
            );
          }
        });
      }
    });
  }
    
  ConsultarUsuarios(){
    this.gruposService.consultarUsuarios(this.dataService.obtener_usuario(1)).subscribe(
      (usuarios: usuarios[]) => {
        this.usuarios = usuarios
        console.log("user:",this.usuarios)
      }, 
      (error) => {
        // Manejo de errores
        console.error('Error:', error);
      }
    );
  }

      
  ConsultarMiembros(id_grupo: any){
    //MANDARLE EL ID DEL GRUPO 
    this.gruposService.consultarMiembros(id_grupo).subscribe(
      (miembros: usuarios[]) => {
        this.miembros = miembros
      }, 
      (error) => {
        // Manejo de errores
        console.error('Error:', error);
      }
    );
  }


  AgregarGrupos(){

    this.loadingService.show()

    const headers = new HttpHeaders({'myHeader': 'procademy'});
    this.http.post("https://localhost:44397/api/Grupos/Agregar_Grupo",this.grupo, {headers: headers})
      .subscribe((res) => { 
        this.loadingService.hide()

        Swal.fire({
          title: 'Miembro agregado correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.ConsultarGrupos();

        this.grupo.descripcion = '';
        this.grupo.usuarios = 2;
        this.grupo.nombre = '';


        console.log(res);
        //this.grupo.resetForm();
      });
   
  }

  
  AgregarMiembros(){

    this.loadingService.show()

    const headers = new HttpHeaders({'myHeader': 'procademy'});

    console.log("seleccion: ", this.seleccionados)

    this.http.post("https://localhost:44397/api/Grupos/Agregar_Persona_Grupo",this.seleccionados, {headers: headers})
      .subscribe((res) => { 
        this.loadingService.hide()
        this.seleccionados = [];
        Swal.fire({
          title: 'Miembro agregado correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.ConsultarGrupos();

        this.grupo.descripcion = '';
        this.grupo.usuarios = 2;
        this.grupo.nombre = '';
      


        console.log(res);
        //this.grupo.resetForm();
      });
   
  }
       
  MostrarRegistro(){
    this.mostrarEditar = false;
    this.grupo.nombre = '';
    this.grupo.descripcion = '';
    this.grupo.usuarios = 2;
  }

  EditarGrupo(){

    this.loadingService.show()

    const headers = new HttpHeaders({'myHeader': 'procademy'});
    this.http.post("https://localhost:44397/api/Grupos/Agregar_Grupo",this.grupo, {headers: headers})
      .subscribe((res) => { 
        this.loadingService.hide()

        Swal.fire({
          title: 'Miembro(s) agregado(s) correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.ConsultarGrupos();

        this.grupo.descripcion = '';
        this.grupo.usuarios = 2;
        this.grupo.nombre = '';


        console.log(res);
        //this.grupo.resetForm();
      });
   
  }
       

  onOptionSelected(event: any) {

    console.log("hola: ",event)
    this.seleccionados.push(event);

    const ultimoIndice = this.seleccionados.length - 1;


    this.seleccionados[ultimoIndice].id_grupo = this.grupo.id_fraccionamiento;

    console.log("selecc: ",this.seleccionados[0])

/*
    const selectedUser = event.option.value;
    if (selectedUser && !this.seleccionados.find(user => user.id_persona === selectedUser.id_persona)) {
      this.seleccionados.push(selectedUser);
    }
  */
    
     // this.seleccionados.push(id_persona,this.usuarios[id_persona-1].nombre, this.usuarios[id_persona-1].apellido_pat, this.usuarios[id_persona-1].apellido_mat);
  }   

  CerrarModal(){
    this.seleccionados = [];
  }

  QuitarSeleccion(event: any){
    const index = this.seleccionados.indexOf(event);

    this.seleccionados.splice(index, 1);
    console.log("quita: ",index)


  }
}

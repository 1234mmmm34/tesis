import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DataService } from '../data.service';
import {  lote, lotes } from "../modelos/propiedades"
import {  inquilino, inquilinos } from "../modelos/inquilinos"
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { fraccionamiento, fraccionamientos } from "../modelos/fraccionamientos";
import { usuario, usuarios } from "../modelos/usuarios"
import { Router } from "@angular/router";
//import { UsuariosComponent } from '../usuarios/usuarios.component';
import * as $ from "jquery";
import Swal from 'sweetalert2'
import { timeInterval } from 'rxjs';




@Component({
  selector: 'app-consultar-propiedades',
  templateUrl: './consultar-propiedades.component.html',
  styleUrls: ['./consultar-propiedades.component.css']
})
export class ConsultarPropiedadesComponent {

  httpclient: any;
  UserGroup: FormGroup;
  UserGroup1: FormGroup;
  UserGroup2: FormGroup;
  lotes: lotes[] = [];
  lote =new lote();
  inquilinos: inquilinos[] = [];
  inquilino =new inquilino();
  AbrirMenu: boolean = false; 
  fraccionamientos: fraccionamientos[] = [];
  usuario = new usuario();
 
  usuarios: usuarios[] = [];
  id_lote: any;
  id_renta: any;
  id_fraccionamiento: any;
  id_usuario_lote: any;
  //: usuario=


//  type usuario = keyof typeof usuario;


  ngOnInit(){
    this.fetchDataUsers(this.dataService.obtener_usuario(1));
    this.fetchData(this.dataService.obtener_usuario(1));
    this.fetchDataPropiedades(this.dataService.obtener_usuario(1));
    this.fetchDataPersonasFraccionamiento(0,0),
  //  this.fetchDataPersonasLote();



    $(function() {
      // Active the first thumb & panel
      $(".tabs-thumb:first-child").addClass("is-active").closest(".tabs").find(".tabs-panel:first-child").show();
      
      $(".tabs-thumb").click(function() {
        // Cancel the siblings
        $(this).siblings(".tabs-thumb").removeClass("is-active").closest(".tabs").find(".tabs-panel").hide();
        // Active the thumb & panel
        $(this).addClass("is-active").closest(".tabs").find(".tabs-panel").eq($(this).index(".tabs-thumb")).show();
      });
    });
    
  }

   
constructor(private router:Router, private http: HttpClient, private dataService: DataService, private fb: FormBuilder, private fb1: FormBuilder, private fb2: FormBuilder){


  this.UserGroup = this.fb.group({
    //   id_fraccionamiento: ['16', Validators.required],
       id_lote: ['', Validators.required],
       id_fraccionamiento: [' ', Validators.required],
       descripcion: ['', Validators.required],
       tipo: ['', Validators.required],
       direccion: ['', Validators.required],
       id_propietario: ['', Validators.required],
       id_renta: ['', Validators.required],
       nombre: ['', Validators.required],
       nombre_renta: ['', Validators.required]
     })

     this.UserGroup1 = this.fb1.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],

    })

    this.UserGroup2 = this.fb2.group({
      id_usuario_lote: ['', Validators.required],
      nombre: ['', Validators.required],
      intercomunicador: ['', Validators.required],
      codigo_acceso: ['', Validators.required],

    })

  }

  fetchData(id_administrador: any) {
    this.dataService.fetchData(id_administrador).subscribe((fraccionamientos: fraccionamientos[]) => {
      console.log(fraccionamientos);
      this.fraccionamientos = fraccionamientos;
    });
  }

  
  fetchDataUsers(id_administrador: any) {
    this.dataService.fetchDataUsers(id_administrador).subscribe((usuarios: usuarios[]) => {
      console.log("fetch", usuarios);
      this.usuarios = usuarios;
    });
  }
  
  fetchDataPropiedades(id_administrador: any){
    this.dataService.fetchDataPropiedades(id_administrador).subscribe((lotes: lotes[]) => {
      console.log("usuarios:",lotes);
      this.lotes = lotes;
    });
  }
  //Busca personas por fraccionamiento
  fetchDataPersonasFraccionamiento(id_fraccionamiento: any, id_administrador: any){
    this.dataService.fetchDataUsers(id_fraccionamiento).subscribe((usuarios: usuarios[]) => {
      console.log("usuarios:", usuarios);
      this.usuarios = usuarios;
    });
  }


  ir_inquilinos(){
    
    this.router.navigate(['/inquilinos']);
  }

  id(id_propietario: any){
    console.log("id_propietario: ",id_propietario);
  }

  //type usuarios1 = keyof typeof usuarios1;

  fetchDataUserPropierty(id_propietario: any) {
    this.dataService.fetchDataUserPropierty(id_propietario).subscribe((usuarios: usuarios[]) => {
      console.log("usuarios1: ", usuarios);
      this.usuarios = usuarios;
     // this.UserGroup1 = usuarios;
        
    //  function editUsers(usuarios) {}
      this.editUsers(usuarios[0].nombre, usuarios[0].telefono, usuarios[0].correo)

    });
  }

  
  edit(lotes: {
    id_lote: any;
    id_renta: any;
    id_fraccionamiento: any;
    descripcion: any;
    tipo: any;
    direccion: any;
    nombre: any;
    nombre_renta: any;
  }){
    this.lote.id_renta;
    this.lote.id_lote = lotes.id_lote;
    this.lote.id_fraccionamiento= lotes.id_fraccionamiento;
    this.lote.descripcion= lotes.descripcion;
    this.lote.tipo= lotes.tipo;
    this.lote.direccion= lotes.direccion;
    this.lote.nombre = lotes.nombre;
    this.lote.nombre_renta = lotes.nombre_renta;
  }





  editUsers(nombre: any,
  telefono: any,
  correo: any) {
    console.log("nom: ", nombre, telefono, correo)
    this.usuario.nombre = nombre,
      this.usuario.telefono = telefono,
      this.usuario.correo = correo

  }

  editInquilinos(inquilinos: {
    id_usuario_lote: any,
    codigo_acceso: any,
    intercomunicador: any,
    id_usuario: any,
    nombre: any}
  ) {
     // console.log("nom: ", nombre, telefono, correo)
      this.inquilino.nombre = inquilinos.nombre,
        this.inquilino.codigo_acceso = inquilinos.codigo_acceso,
        this.inquilino.intercomunicador = inquilinos.intercomunicador,
        this.inquilino.id_usuario_lote = inquilinos.id_usuario_lote;
    }



  fetchDataPersonasLote(id_propietario: any){
    this.dataService.fetchDataPersonasLote(id_propietario).subscribe((inquilinos: inquilinos[]) => {
      console.log("this.usuarios[0].id_persona:", id_propietario);
      this.inquilinos = inquilinos;
    });
  }

  agregar_inquilino(inquilino: {
    codigo_acceso: any;
    intercomunicador: any; 
    nombre: any;
  }) {
  
  
      const params = {
   
        id_usuario: this.usuarios[0].id_persona,
        id_lote: this.usuarios[0].id_lote,
        id_renta: this.usuarios[0].id_persona,
        id_fraccionamiento: this.dataService.obtener_usuario(1),
        codigo_acceso: inquilino.codigo_acceso,
        intercomunicador: inquilino.intercomunicador,
        nombre: inquilino.nombre
  
      };
  
      console.log("params: ",params)
  
      let direccion = "https://localhost:44397/api/Usuario_lote/Agregar_inquilino";
  
      const headers = new HttpHeaders({ 'myHeader': 'procademy' });
      this.http.post(
        direccion,
        params, { headers: headers })
        .subscribe((res) => {
          console.log(res);
          Swal.fire({
            title: 'Inquilino agregado correctamente',
            text: '',
            icon: 'success' 
          })
         // this.fetchDataPersonasLote( this.usuarios[0].id_persona);
         window.setTimeout( function() {
          window.location.reload();
        }, 2000);
         // location.reload(timeInterval(3000));
        //  this.UserGroup2.reset();
        });
  
    }


    eliminar_inquilino(id_usuario_lote: any, codigo_acceso: any){
      this.eliminarAcuerdo(id_usuario_lote, codigo_acceso).subscribe(
        (respuesta: any) => {
          console.log('Acuerdo eliminado:', respuesta);
          Swal.fire({
            title: 'Inquilino eliminado correctamente',
            text: '',
            icon: 'success' 
          })
          // Vuelve a cargar los acuerdos después de eliminar
          this.fetchDataPersonasLote(this.usuarios[0].id_persona);
        },
        (error) => {
          Swal.fire({
            title: 'Error al eliminar inquilino',
            text: '',
            icon: 'error' 
          })
          console.error('Error al eliminar acuerdo:', error);
          // Manejo de errores
        }
      );
    }

    eliminarAcuerdo(id_usuario_lote: any, codigo_acceso: any) {
      return this.http.delete(`https://localhost:44397/api/Usuario_lote/Eliminar_inquilino?id_lote=${id_usuario_lote}&codigo_acceso=${codigo_acceso}`,{ responseType: 'text' });
    }


}
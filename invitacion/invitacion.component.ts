import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service'
import { InvitacionService } from './invitacion.service';
import { Invitacion } from './invitacion.model';
import { v4 as uuidv4 } from 'uuid';
import { CorreoService } from './correo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './usuario.model';
import Swal from 'sweetalert2'
import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Personas } from '../modelos/personas';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacio.component.html',
  styleUrls: ['./invitacion.component.css']
})
export class InvitacionComponent {
  UserGroup: FormGroup;
  personas: Personas[] = [];

  usuario: Usuario= {
    nombre:'',
    apellido_pat: '',
    apellido_mat: '',
    telefono: '',
    fecha_nacimiento: '',
    contrasenia: '',
    confirmarContrasena: '',
    correo:'',
    id_fraccionamiento:'',
  };
  invitacion: Invitacion[] = [];

  constructor(private route: ActivatedRoute,private invitacionService: InvitacionService, private correoService: CorreoService,private fb: FormBuilder, private dataService:DataService,private http: HttpClient) {
    this.UserGroup = this.fb.group({
      nombre: ['', Validators.required],
      apellido_pat: ['', Validators.required],
      apellido_mat: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      correo: ['', Validators.required],
      id_fraccionamiento: ['', Validators.required],
      tipo_usuario: ['', Validators.required],

      
    })
  }


  //id_lote:number=6; // esta variable es la que envia para registrar la invitacion
  id_loteParaMostrar:number=0; //esta variable es la que recibe el valor de la consulta

  ngOnInit(): void {
    this.obtenerDatosInvitacion();
    //this.generarInvitacion("fierro_ross@live.com.mx",15);
  }

  obtenerDatosInvitacion(){
    this.route.queryParams.subscribe(params => {
      const token = params['token']; // Obtiene el token de la URL
      if (token) {
        this.invitacionService.obtenerDatosInvitacion(token).subscribe(
          (response: Invitacion[]) => {
            if (response.length > 0) { // Verifica si se obtuvieron datos
              this.invitacion = response;
              console.log(this.invitacion);
              this.UserGroup.patchValue({correo: this.invitacion[0].correo_electronico});
              this.UserGroup.patchValue({id_fraccionamiento: this.invitacion[0].id_fraccionamiento});
              this.UserGroup.patchValue({id_lote: 'ID del lote: '+this.invitacion[0].lote});
              this.UserGroup.patchValue({tipo_usuario:this.invitacion[0].tipo_usuario});
              
            } else {
              console.log(this.invitacion);
              // Manejar el caso cuando no se encuentran datos con el token
            }
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'Error en la invitacion',
              text: 'Error al consultar los datos de la invitacion. Contacte a su administrador',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        );
      }
    });
    
    
  }


  enviarCorreo(correoDestinatario: string, mensaje: string): void {
    this.correoService.Enviar_Correo(correoDestinatario, mensaje);
  }


  consultarCorreo() {
    this.dataService.consultarCorreo(this.dataService.obtener_usuario(6)).subscribe((personas: Personas[]) => {
      //console.log(controladores);
      //this.correo_invitado1 = this.personas[0].correo;
    });
  }

 


  agregar_usuario(usuario: {

    id_usuario: number | undefined;
    nombre: string | undefined;
    apellido_pat: string | undefined;
    apellido_mat: string | undefined;
    id_fraccionamiento: number | undefined;
    tipo_usuario: string | undefined; 
    id_lote: number |undefined;
    telefono: string | undefined;
    fecha_nacimiento: Date | undefined;
    correo: string | undefined;
    contrasenia: string | undefined;
    confirmarContrasena: string | undefined;
  
  }) {

    console.log("params: ",usuario)

   
  
    if (usuario.contrasenia == usuario.confirmarContrasena) {
  
      const params = {
        nombre: usuario.nombre,
        apellido_pat: usuario.apellido_pat,
        apellido_mat: usuario.apellido_mat,
        tipo_usuario: "usuario",
        telefono: usuario.telefono,
        fecha_nacimiento: usuario.fecha_nacimiento,
        correo: usuario.correo,
        contrasenia: usuario.contrasenia,
        id_fraccionamiento: this.invitacion[0].id_fraccionamiento,
        id_administrador: this.invitacion[0].id_fraccionamiento,
        id_lote: 1,
        hikvision: "permitido"
  
        //  Intercomunicador: 123,
        //  Codigo_acceso: "123"
      };

      console.log("params: ",usuario)
  
      let direccion = "https://localhost:44397/api/Usuarios/Agregar_Usuario";
  
      const headers = new HttpHeaders({ 'myHeader': 'procademy' });
      this.http.post(
        direccion,
        params, { headers: headers })
        .subscribe((res) => {
          console.log(res);
          //console.log(this.usuarios[0].fecha_nacimiento);
          
  
        });
    }
    else {
      console.log("error: intentalo de nuevo");
    }
  
    //this.usuarios.push(this.UserGroup.value);
    this.UserGroup.reset();
  
  }
  








  
  }
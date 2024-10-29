import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import { usuario, usuarios } from "../modelos/usuarios"
import { fraccionamiento, fraccionamientos } from "../modelos/fraccionamientos"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent {
  title='registro_usuario'
  usuario = new usuario();
  usuarios: usuarios[] = [];
  UserGroup: FormGroup;
  fraccionamientos: fraccionamientos[] | undefined;
  id_fracc: any;
  tipo_usuario: any;


  ngOnInit(): void {

    this.fetchDataUsers(this.dataService.obtener_usuario(1));
   // this.fetchData(this.dataService.obtener_usuario(1));
  }
/*

  fetchData(id_administrador: any) {
    this.dataService.fetchData(id_administrador).subscribe((fraccionamientos: fraccionamientos[]) => {
      console.log(fraccionamientos);
      this.fraccionamientos = fraccionamientos;
    });
  }
*/
  fetchDataUsers(id_administrador: any) {
    this.dataService.fetchDataUsers(id_administrador).subscribe((usuarios: usuarios[]) => {
      console.log("fetch", usuarios);
      this.usuarios = usuarios;
    });
  }

  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder) {

    this.UserGroup = this.fb.group({
      id_persona: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_pat: ['', Validators.required],
      apellido_mat: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      id_lote: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      id_fraccionamiento: ['', Validators.required],

    })
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

    //   Intercomunicador: string | undefined;
    //   Codigo_Acceso: string | undefined;

  }) {

    if (usuario.contrasenia == usuario.confirmarContrasena) {

      const params = {
        nombre: usuario.nombre,
        apellido_pat: usuario.apellido_pat,
        apellido_mat: usuario.apellido_mat,
        tipo_usuario: usuario.tipo_usuario,
        telefono: usuario.telefono,
        fecha_nacimiento: usuario.fecha_nacimiento,
        correo: usuario.correo,
        contrasenia: usuario.contrasenia,
        id_fraccionamiento: this.dataService.obtener_usuario(1),
        id_administrador: this.dataService.obtener_usuario(1),
        id_lote: 1

        //  Intercomunicador: 123,
        //  Codigo_acceso: "123"
      };

      let direccion = "https://localhost:44397/api/Usuarios/Agregar_Usuario";

      const headers = new HttpHeaders({ 'myHeader': 'procademy' });
      this.http.post(
        direccion,
        params, { headers: headers })
        .subscribe((res) => {
          console.log(res);
          console.log(this.usuarios[0].fecha_nacimiento);

        });
    }
    else {
      console.log("error: intentalo de nuevo");
    }

    this.usuarios.push(this.UserGroup.value);
    this.UserGroup.reset();

  }




  edit(usuarios: {
    id_persona: any;
    nombre: any,
    apellido_pat: any,
    apellido_mat: any,
    tipo_usuario: any,
    telefono: any,
    fecha_nacimiento: any,
    correo: any,
    contrasenia: any,
    Intercomunicador: any,
    Codigo_Acceso: any,
    id_fraccionamiento: any,

  }) {
    this.usuario.id_persona = usuarios.id_persona;
    this.usuario.nombre = usuarios.nombre;
    this.usuario.apellido_pat = usuarios.apellido_pat,
      this.usuario.apellido_mat = usuarios.apellido_mat,
      this.usuario.tipo_usuario =  this.tipo_usuario,
      this.usuario.telefono = usuarios.telefono,
      this.usuario.fecha_nacimiento = usuarios.fecha_nacimiento,
      this.usuario.correo = usuarios.correo,
      this.usuario.contrasenia = usuarios.contrasenia,
      this.usuario.Intercomunicador = usuarios.Intercomunicador,
      this.usuario.Codigo_Acceso = usuarios.Codigo_Acceso
      this.usuario.id_fraccionamiento = this.id_fracc

  }



  onRowClicked(usuario: any) {
    // this.id_fracc = fraccionamiento['id_fraccionamiento'];
    // this.id_user = this.usuario.id_persona;
    //console.log("id_persona: ", this.usuario.id_persona)
    this.id_fracc = usuario['id_fraccionamiento']
    this.tipo_usuario= usuario['tipo_usuario']



  }

  actualizar_usuario(
    usuarios: {
      id_persona: string,
      nombre: string,
      apellido_pat: string,
      apellido_mat: string,
      tipo_usuario: string,
      telefono: any,
      fecha_nacimiento: any,
      intercomunicador: any,
      codigo_Acceso: any,
      id_fraccionamiento: number,
      correo: any,
      contrasenia: any
    }
  ) {

    const params = {
      id_persona: this.usuario.id_persona,
      nombre: usuarios.nombre,
      apellido_pat: usuarios.apellido_pat,
      apellido_mat: usuarios.apellido_mat,
      telefono: usuarios.telefono,
      id_fraccionamiento: usuarios.id_fraccionamiento,
      tipo_usuario: usuarios.tipo_usuario,
      intercomunicador: "123",
      codigo_acceso: "123",
      fecha_nacimiento: usuarios.fecha_nacimiento,
      correo: usuarios.correo,
      contrasenia: usuarios.contrasenia,
      id_lote: 1
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("params  ", params);



    return this.http.put("https://localhost:44397/api/Personas/Actualizar_Persona", params).subscribe(
      (_response) => {
        console.log("hola");
        console.log("https://localhost:44397/api/Personas/Actualizar_Persona", params);
        
    
        this.ngOnInit();

      }
    )
  }

  id_lote: any;
  id_fraccionamiento: any;
/*
 actualizar_tesorero(id_fraccionamiento: number, id_tesorero: number){

  return this.http.put("https://evaluacionesuas-001-site1.gtempurl.com/Fraccionamientos/Actualizar_Tesorero?id_fraccionamiento="+id_fraccionamiento+"&id_tesorero=4"+id_tesorero).subscribe(
    (_response) => {
      console.log("hola");
      this.ngOnInit();

    }
  )
 } 
*/
  delete(usuario: any) {
    this.id_fracc = usuario['id_persona'];
    return this.http.delete("https://localhost:44397/api/Personas/Eliminar_Persona?id_persona=" + this.id_fracc).subscribe(
      () => {
        this.fetchDataUsers(this.dataService.obtener_usuario(1));
        console.log("hola");
        this.UserGroup.reset();


      })


  }
}
 
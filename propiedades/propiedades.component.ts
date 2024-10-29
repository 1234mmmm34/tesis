import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms'
import { DataService } from '../data.service';
import { lote, lotes } from "../modelos/propiedades"
import { inquilino, inquilinos } from "../modelos/inquilinos"
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { fraccionamiento, fraccionamientos } from "../modelos/fraccionamientos";
import { usuario, usuarios } from "../modelos/usuarios"
import { Observable, timeInterval } from 'rxjs';
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import { InvitacionService } from './invitacion.service';
import { CorreoService } from './correo.service';


@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent {

  tipo_formulario: string = '';
  httpclient: any;
  UserGroup: FormGroup;
  UserGroup1: FormGroup;
  UserGroup2: FormGroup;
  lotes: lotes[] = [];
  lote = new lote();
  inquilinos: inquilinos[] = [];
  inquilino = new inquilino();
  AbrirMenu: boolean = false;
  fraccionamientos: fraccionamientos[] = [];
  usuarios: usuarios[] = [];
  usuarios1: usuarios[] = [];
  id_lote: any;
  id_renta: any;
  id_fraccionamiento: any;
  id_usuario_lote: any;
  nrSelect = "casa1";
  usuario = new usuario();
  usuario1 = new usuario();


  onSelect(id_fraccionamiento: any) {
    console.log(id_fraccionamiento);
    // this.id_fraccionamiento = id_fraccionamiento;
    this.fetchDataPersonasFraccionamiento(this.dataService.obtener_usuario(1))
    // this.ubigeo.getProvincias(code); // con esto ya hemos obtenido las provincias del departamento seleccionado, ahora solo falta ponerlo en la plantilla html.
  }


  onRowClicked(lote: any) {
    this.id_lote = lote['id_lote']
    this.id_renta = lote['id_renta']
    this.id_fraccionamiento = lote['id_fraccionamiento']
    console.log(this.id_lote)

  }

  onRowClicked1(inquilino: any) {
    this.id_usuario_lote = inquilino['id_usuario_lote']
  }

  CerrarMenu() {
    this.AbrirMenu = false;
  }

  AbrirrMenu(lote: any) {
    this.fetchDataPersonasFraccionamiento(this.dataService.obtener_usuario(1))
    this.fetchDataPersonasLote(lote.id_lote);
    console.log("lote: ", lote.id_lote)
    this.AbrirMenu = true;
  }

  ngOnInit() {
    //  this.fetchDataUsers(this.dataService.obtener_usuario(1));
    this.fetchData(this.dataService.obtener_usuario(1));
    this.fetchDataPropiedades(this.dataService.obtener_usuario(1));
    this.fetchDataPersonasFraccionamiento(this.dataService.obtener_usuario(1))
    this.fetchDataLastUser1(),
      this.dataService.fetchDataUsers(this.dataService.obtener_usuario(1)).subscribe((usuarios: usuarios[]) => {
        this.usuarios = usuarios;
      });
    $(function () {
      // Active the first thumb & panel
      $(".tabs-thumb:first-child").addClass("is-active").closest(".tabs").find(".tabs-panel:first-child").show();
      $(this).addClass("is-active");

      $(".tabs-thumb").click(function () {
        // Cancel the siblings
        $(this).siblings(".tabs-thumb").removeClass("is-active").closest(".tabs").find(".tabs-panel").hide();

        $(this).addClass("is-active");
        // Active the thumb & panel
        $(this).addClass("is-active").closest(".tabs").find(".tabs-panel").eq($(this).index(".tabs-thumb")).show();
      });




      // Active the first thumb & panel
      $(".tabs-thumb1:first-child").addClass("is-active").closest(".tabs1").find(".tabs-panel1:first-child").show();
      $(this).addClass("is-active");

      $(".tabs-thumb1").click(function () {
        // Cancel the siblings
        $(this).siblings(".tabs-thumb1").removeClass("is-active").closest(".tabs1").find(".tabs-panel1").hide();

        $(this).addClass("is-active");
        // Active the thumb & panel
        $(this).addClass("is-active1").closest(".tabs1").find(".tabs-panel1").eq($(this).index(".tabs-thumb1")).show();
      });
    });

  }

  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder, private fb1: FormBuilder, private invitacionService: InvitacionService, private correoService: CorreoService) {

    this.UserGroup = this.fb.group({
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      direccion: ['', Validators.required],
      tipo_formulario: ['', Validators.required],
    })


    this.UserGroup1 = this.fb1.group({
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

    this.UserGroup2 = this.fb1.group({
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
    /*
    this.UserGroup1 = this.fb1.group({
      //   id_fraccionamiento: ['16', Validators.required],
         id_usuario: ['', Validators.required],
         nombre: ['', Validators.required],
         codigo_acceso: ['', Validators.required],
         intercomunicador: ['', Validators.required],
        
       })
       */
  }


  async agregar_usuario(usuario: {

    id_usuario: number | undefined;
    nombre: string | undefined;
    apellido_pat: string | undefined;
    apellido_mat: string | undefined;
    id_fraccionamiento: number | undefined;
    tipo_usuario: string | undefined;
    id_lote: number | undefined;
    telefono: string | undefined;
    fecha_nacimiento: Date | undefined;
    correo: string | undefined;
    contrasenia: string | undefined;
    confirmarContrasena: string | undefined;
  },
    lote: {
      descripcion: string;
      tipo: string;
      direccion: string;
    },
    usuario1: {
      id_usuario: number | undefined;
      nombre: string | undefined;
      apellido_pat: string | undefined;
      apellido_mat: string | undefined;
      id_fraccionamiento: number | undefined;
      tipo_usuario: string | undefined;
      id_lote: number | undefined;
      telefono: string | undefined;
      fecha_nacimiento: Date | undefined;
      correo: string | undefined;
      contrasenia: string | undefined;
      confirmarContrasena: string | undefined;
    }, tipo_formulario: any) {

    //   console.log("var1", var1)
    //console.log("AQUI ENTRA")

    if (usuario.contrasenia == usuario.confirmarContrasena) {

      if (this.correo_invitado !== '') {
        usuario.nombre = "Correo enviado";
        usuario.apellido_pat = "";
        usuario.apellido_mat = "";
        usuario.telefono = "";
        usuario.fecha_nacimiento = new Date();


        console.log("generarinvitacion");
        const token = uuidv4();
        console.log(token, this.correo_invitado, this.dataService.obtener_usuario(1), this.dataService.obtener_usuario(5), this.dataService.obtener_usuario(2), "propietario")
        
        var correo = this.correo_invitado;
        this.invitacionService.generarInvitacion(token, this.correo_invitado, this.dataService.obtener_usuario(1), this.dataService.obtener_usuario(5), this.dataService.obtener_usuario(2), "propietario")
          .subscribe(
            response => {
              console.log('Success:', response);
              this.correoService.Enviar_Correo(correo, "haz sido invitado por tu administrador para unirte a una comunidad en linea\n por favor termina tu registro en el siguiente link: \n http://localhost:4200/Invitacion?token=" + token);
             // this.enviarCorreo(correoElectronico, "haz sido invitado por tu administrador para unirte a una comunidad en linea\n por favor termina tu registro en el siguiente link: \n http://localhost:4200/Invitacion?token=" + token);
              Swal.fire({
                title: 'Invitacion enviada correctamente',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })
    
            },
            error => {
              console.error('Error al generar la invitación:', error);
    
            }
          );





      }
      else {
        this.correo_invitado = "N/A"
      }


      const params = {
        nombre: usuario.nombre,
        apellido_pat: usuario.apellido_pat,
        apellido_mat: usuario.apellido_mat,
        tipo_usuario: "propietario",
        telefono: usuario.telefono,
        fecha_nacimiento: usuario.fecha_nacimiento,
        correo: this.correo_invitado,
        contrasenia: "na",
        id_fraccionamiento: this.dataService.obtener_usuario(1),
        id_administrador: this.dataService.obtener_usuario(1),
        id_lote: 1,
        hikvision: "permitido"


        //  Intercomunicador: 123,
        //  Codigo_acceso: "123"
      };
      console.log("PARAMSS: ", params)
      let direccion = "https://localhost:44397/api/Usuarios/Agregar_Usuario";

      const headers = new HttpHeaders({ 'myHeader': 'procademy' });
      this.http.post(
        direccion,
        params, { headers: headers })
        .subscribe((res) => {
          console.log("params: ", lote.descripcion, lote.direccion, lote.tipo);

          //  if(tipo_formulario=='no'){
          //     this.agregar_lote(lote.descripcion, lote.direccion, lote.tipo);
          //    }
          //    else{
          this.agregar_arrendatario(usuario1, lote, tipo_formulario);
        //  this.agregarConCorreo("arrendatario", this.correo_invitado) 
          //    }

          console.log(this.usuarios[0].fecha_nacimiento);


          // this.agregar_lote(this.UserGroup.value);

          //  this.agregar_lote(this.lote);

        },
          (error) => {
            Swal.fire({
              title: 'Agrega los datos del propietario',
              text: '',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          });
    }
    else {
      console.log("error: intentalo de nuevo");
    }

    this.usuarios.push(this.UserGroup.value);
    //this.fetchDataLastUser();
    this.UserGroup.reset();
    this.UserGroup1.reset();

  }





  async agregar_arrendatario(usuario: {

    id_usuario: number | undefined;
    nombre: string | undefined;
    apellido_pat: string | undefined;
    apellido_mat: string | undefined;
    id_fraccionamiento: number | undefined;
    tipo_usuario: string | undefined;
    id_lote: number | undefined;
    telefono: string | undefined;
    fecha_nacimiento: Date | undefined;
    correo: string | undefined;
    contrasenia: string | undefined;
    confirmarContrasena: string | undefined;
  },
    lote: {
      descripcion: string;
      tipo: string;
      direccion: string;
    }, tipo_formulario: any) {

    //   console.log("var1", var1)

    if (usuario.contrasenia == usuario.confirmarContrasena) {

      if (this.correo_invitado1 !== '') {
        usuario.nombre = "Correo enviado";
        usuario.apellido_pat = "";
        usuario.apellido_mat = "";
        usuario.telefono = "";

        
        console.log("generarinvitacion");
        const token = uuidv4();
        console.log(token, this.correo_invitado1, this.dataService.obtener_usuario(1), this.dataService.obtener_usuario(5), this.dataService.obtener_usuario(2), "arrendatario")
        
        var correo = this.correo_invitado1;
        this.invitacionService.generarInvitacion(token, this.correo_invitado1, this.dataService.obtener_usuario(1), this.dataService.obtener_usuario(5), this.dataService.obtener_usuario(2), "arrendatario")
          .subscribe(
            response => {
              console.log('Success:', response);
              this.correoService.Enviar_Correo(correo, "haz sido invitado por tu administrador para unirte a una comunidad en linea\n por favor termina tu registro en el siguiente link: \n http://localhost:4200/Invitacion?token=" + token);
             // this.enviarCorreo(correoElectronico, "haz sido invitado por tu administrador para unirte a una comunidad en linea\n por favor termina tu registro en el siguiente link: \n http://localhost:4200/Invitacion?token=" + token);
              Swal.fire({
                title: 'Invitacion enviada correctamente',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })
    
            },
            error => {
              console.error('Error al generar la invitación:', error);
    
            }
          );
      }else{
        this.correo_invitado1='N/A'
      }

      if (tipo_formulario == 'no') {
        usuario.nombre = "N/A";
        usuario.apellido_pat = "";
        usuario.apellido_mat = "";
        usuario.telefono = "";
        usuario.fecha_nacimiento = new Date();
        usuario.correo = "";
      }

      const params = {
        nombre: usuario.nombre,
        apellido_pat: usuario.apellido_pat,
        apellido_mat: usuario.apellido_mat,
        tipo_usuario: "arrendatario",
        telefono: usuario.telefono,
        fecha_nacimiento: usuario.fecha_nacimiento,
        correo: this.correo_invitado1,
        contrasenia: "na",
        id_fraccionamiento: this.dataService.obtener_usuario(1),
        id_administrador: this.dataService.obtener_usuario(1),
        id_lote: 1,
        hikvision: "permitido"

        //  Intercomunicador: 123,
        //  Codigo_acceso: "123"
      };
      console.log(params)
      let direccion = "https://localhost:44397/api/Usuarios/Agregar_Usuario";

      const headers = new HttpHeaders({ 'myHeader': 'procademy' });
      this.http.post(
        direccion,
        params, { headers: headers })
        .subscribe((res) => {
          //   console.log("params: ", lote.descripcion, lote.direccion, lote.tipo);
          // if()
          this.agregar_lote(lote.descripcion, lote.direccion, lote.tipo);

          //  console.log(this.usuarios[0].fecha_nacimiento);
          // this.agregar_lote(this.UserGroup.value);

          //  this.agregar_lote(this.lote);

        },
          (error) => {
            Swal.fire({
              title: 'Completa los datos del arrendatario',
              text: '',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          });
    }
    else {
      console.log("error: intentalo de nuevo");
    }

    this.usuarios.push(this.UserGroup.value);
    //this.fetchDataLastUser();
    this.UserGroup.reset();
    this.UserGroup1.reset();
    this.UserGroup2.reset();

  }




  nombre_inquilino: any


  obtener_etiqueta(event: any) {
    this.nombre_inquilino = event.target.selectedOptions[0].text
  }

  agregar_inquilino(inquilino: {

    id_usuario: any;
    id_lote: any;
    id_renta: any;
    id_fraccionamiento: any;
    codigo_acceso: any;
    intercomunicador: any;
    nombre: any;
  }) {


    const params = {

      id_usuario: inquilino.id_usuario,
      id_lote: this.id_lote,
      id_renta: this.id_renta,
      id_fraccionamiento: this.id_fraccionamiento,
      codigo_acceso: "123",
      intercomunicador: "123",
      nombre: this.nombre_inquilino

    };

    console.log("params: ", params)

    let direccion = "https://localhost:44397/api/Usuario_lote/Agregar_inquilino";

    const headers = new HttpHeaders({ 'myHeader': 'procademy' });
    this.http.post(
      direccion,
      params, { headers: headers })
      .subscribe((res) => {
        console.log(res);
        //  this.inquilinos.push(this.UserGroup1.value);
        //this.inquilinos.push(params.nombre.value);
        this.fetchDataPersonasLote(this.id_lote);
        this.UserGroup1.reset();
      });

  }

  fetchData(id_administrador: any) {
    this.dataService.fetchData(id_administrador).subscribe((fraccionamientos: fraccionamientos[]) => {
      console.log(fraccionamientos);
      this.fraccionamientos = fraccionamientos;
    });
  }
 
  fetchDataPropiedades(id_administrador: any) {
    this.dataService.fetchDataPropiedades(id_administrador).subscribe((lotes: lotes[]) => {
      console.log("usuarios:", lotes);
      this.lotes = lotes;
    });
  }
  //Busca personas por fraccionamiento
  fetchDataPersonasFraccionamiento(id_fraccionamiento: any) {
    this.dataService.fetchDataUsers(id_fraccionamiento).subscribe((usuarios: usuarios[]) => {
      console.log("usuarios:", usuarios);
      this.usuarios = usuarios;
    });
  }

  fetchDataPersonasLote(lote: any) {
    this.dataService.fetchDataPersonasLote(lote).subscribe((inquilinos: inquilinos[]) => {
      //  console.log("usuarios:", usuarios);
      this.inquilinos = inquilinos;
    });
  }

  edit(lotes: {
    descripcion: any;
    tipo: any;
    direccion: any;
    id_propietario: any;
    id_renta: any;
    id_fraccionamiento: any;
  }) {
    this.lote.id_fraccionamiento = lotes.id_fraccionamiento,
      this.lote.descripcion = lotes.descripcion,
      this.lote.tipo = lotes.tipo
    this.lote.direccion = lotes.direccion,
      this.lote.id_renta = lotes.id_renta,
      this.lote.id_propietario = lotes.id_propietario
  }

  last: any;


  async fetchDataLastUser1() {
    this.dataService.fetchDataLastUser(this.dataService.obtener_usuario(1)).subscribe((last) => {
      this.last = last[0].id_persona;
      console.log(this.last)
      this.dataService.fetchDataLastUser(this.dataService.obtener_usuario(1)).subscribe((last) => {
        this.last = last[0].id_persona;
        console.log(this.last)
      });


      // localStorage.setItem("data", JSON.stringify(last[0]));
      //  console.log(this.last);
      // console.log("LAST: ",last[0].id_persona);
    });
  }

  async agregar_lote(
    descripcion: string, direccio: string, tipo: string
  ) {

    //console.log("propietario: ",lote.id_propietario)
    //  console.log("LAST: ",this.last);
    const params = {
      id_lote: 0,
      // id_fraccionamiento: Number(lote.id_fraccionamiento),
      id_fraccionamiento: this.dataService.obtener_usuario(1),
      descripcion: descripcion,
      tipo: tipo,
      direccion: direccio,
      id_propietario: this.last + 1,
      id_administrador: this.dataService.obtener_usuario(1),
      id_renta: this.last + 2,
      nombre: "",
      nombre_renta: ""
    };

    console.log("params: ", params)

    let direccion = "https://localhost:44397/Propiedades/Agregar_Propiedad";

    const headers = new HttpHeaders({ 'myHeader': 'procademy' });
    this.http.post(
      direccion,
      params, { headers: headers })
      .subscribe((res) => {
        Swal.fire({
          title: 'Propiedad agregada correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        /*
        setTimeout(() => {
          location.reload()
        }, 2000);
*/
      },
        (error) => {
          Swal.fire({
            title: 'Invitacion generada correctamente',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        });

  }
  processResults() {
    throw new Error('Method not implemented.');
  }


  delete(id_lote: any) {
    return this.http.delete("https://localhost:44397/Propiedades/Eliminar_Propiedad?id_lote=" + id_lote).subscribe(
      () => {
        this.fetchDataPropiedades(this.dataService.obtener_usuario(1))
        console.log("hola");


      })
  }


  delete_user(id_usuario_lote: any) {
    return this.http.delete("https://localhost:44397/api/Usuario_lote/Eliminar_inquilino?id_lote=" + id_usuario_lote).subscribe(
      () => {
        console.log("eliminado", this.id_lote)
        this.fetchDataPersonasLote(this.id_lote);

      })


  }

  actualizar_lote(
    lotes: {
      descripcion: any;
      tipo: any;
      direccion: any;
      id_propietario: any;
      id_renta: any;
      id_fraccionamiento: any;
      id_lote: any;
    }
  ) {

    const params = {
      id_fraccionamiento: lotes.id_fraccionamiento,
      descripcion: lotes.descripcion,
      tipo: lotes.tipo,
      direccion: lotes.direccion,
      id_renta: lotes.id_renta,
      id_propietario: lotes.id_propietario,
      id_lote: this.id_lote
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("actualizar: ", params)

    return this.http.put("https://localhost:44397/Propiedades/Actualizar_Propiedad", params).subscribe(
      (_response) => {
        console.log("actualiza", params)
        this.ngOnInit();
        this.UserGroup.reset();

      }
    )

  }

  /* parte de enviar el correo electronico coon la invitacion*/
  /* parte de enviar el correo electronico coon la invitacion*/
  /* parte de enviar el correo electronico coon la invitacion*/
  correo_invitado: string = '';
  correo_invitado1: string = '';


  enviarCorreo(correoDestinatario: string, mensaje: string): void {
    this.correoService.Enviar_Correo(correoDestinatario, mensaje);
  }


}


function processResults() {
  throw new Error('Function not implemented.');
}



import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { controladores, controlador, fraccionamientos, fraccionamiento } from "../modelos/fraccionamientos"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
import { LoadingService } from '../loading-spinner/loading-spinner.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-fraccionamientos',
  templateUrl: './fraccionamientos.component.html',
  styleUrls: ['./fraccionamientos.component.css']
})

export class FraccionamientosComponent {

  showHelp: boolean = false;

  httpclient: any;
  UserGroup: FormGroup;
  controladores: controladores[] = [];
  controlador = new controlador();
  fraccionamientos: fraccionamientos[] = [];
  fraccionamiento = new fraccionamiento();
  octetos: string[] = [];
  cambiarip: boolean = false;

  editar: boolean = false;

  nombreControlador: string = this.dataService.obtener_usuario(10);
  ipControlador: string = this.dataService.obtener_usuario(12);




  title = 'AngularHttpRequest';
  row: any;
  home: any;
  id_fracc: any;
  cont: any;


  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder, private loadingService: LoadingService) {


    this.UserGroup = this.fb.group({
      id_controlador: ['', Validators.required],
      modelo: ['', Validators.required],
      nombre: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      ip: ['', Validators.required],
      port: ['', Validators.required],
      oct1: ['', Validators.required],
      oct2: ['', Validators.required],
      oct3: ['', Validators.required],
      oct4: ['', Validators.required]

    })
  }



  ngOnInit(): void {
    this.fetchDataHikvision(this.dataService.obtener_usuario(1));
    this.cambiarColorBoton();
    document.addEventListener('DOMContentLoaded', function () {
      // Aquí puedes inicializar cosas si es necesario
    });

    
  this.nombreControlador = this.dataService.obtener_usuario(10);
  this.ipControlador = this.dataService.obtener_usuario(12);

  }

  async Actualizar_Estado(): Promise<boolean> {
    const url = `https://localhost:44397/Hikvision/Actualizar_Estado?id_controlador=${this.controlador.id_controlador}&id_fraccionamiento=${this.dataService.obtener_usuario(3)}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.nombreControlador = this.controlador.nombre;
       // this.ipControlador = `${this.controlador.oct1}.${this.controlador.oct2}.${this.controlador.oct3}.${this.controlador.oct4}`;
       this.ipControlador = this.controlador.ip;

        // Asumiendo que la respuesta es directamente un booleano
        const isSuccess = await response.json();

        const boton = document.getElementById("conexion");
        if (boton) {
          if (!(response.ok && isSuccess)) {
            boton.classList.add("button-rojo");
            boton.classList.remove("button-verde");
          } else {
            boton.classList.add("button-verde");
            boton.classList.remove("button-rojo");
          }
        }

        if (response.ok && isSuccess) { // Verifica si la respuesta es OK y el booleano es true
            Swal.fire({
                title: 'Controlador actualizado',
                text: 'Es probable que los cambios no se vean reflejados hasta que inicie sesión de nuevo',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            this.fetchDataHikvision(this.dataService.obtener_usuario(3));
            return true; // Devuelve true si la respuesta es exitosa
        } else {
            // Si la respuesta es OK pero el booleano es false
            Swal.fire({
                title: 'Error al actualizar el controlador',
                text: 'El controlador no existe o no se encuentra activo por el momento',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return false; // Devuelve false en caso de error
        }

        
      

    } catch (error) {
        // Manejo de errores de la solicitud
        Swal.fire({
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return false; // Devuelve false en caso de error
    }
}



abrir_puerta(): void {
  fetch('https://localhost:44397/Hikvision/Abrir_puerta', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* Aquí puedes incluir los datos que necesitas enviar */ }),
  })
      .then((response) => {
          if (!response.ok) {
              // Manejo de error sin console.log
              return; // Salimos si hay un error
          }
          return response.json(); // o response.text() si no es JSON
      })
      .then((data) => {
          // Aquí puedes manejar los datos sin imprimirlos en consola
      })
      .catch((error) => {
          // Manejo de error sin console.log
      });
}



  cambiarColorBoton(): void {
    const boton = document.getElementById("conexion");
    if (boton) {
      if (!this.dataService.obtener_usuario(9)) {
        boton.classList.add("button-rojo");
        boton.classList.remove("button-verde");
      } else {
        boton.classList.add("button-verde");
        boton.classList.remove("button-rojo");
      }
    }
  }



  onRowClicked(fraccionamiento: any) {
    this.id_fracc = fraccionamiento['id_fraccionamiento'];
  }

  edit(controladores: {
    id_controlador: any;
    nombre: any;
    user: any;
    password: any;
    ip: any;
    port: any;
  }) {

    console.log(controladores)

    this.controlador.id_controlador = controladores.id_controlador;
    this.controlador.nombre = controladores.nombre;
    this.controlador.user = controladores.user;
    this.controlador.password = controladores.password;
    this.controlador.ip = controladores.ip
    
    if(controladores.port=="null"){
      controladores.port="0";
    }

    this.controlador.port = controladores.port;
   // this.octetos = (controladores.ip).split('.');

    this.editar = true;

    this.controlador.oct1 = this.octetos[0];
    this.controlador.oct2 = this.octetos[1];
    this.controlador.oct3 = this.octetos[2];
    this.controlador.oct4 = this.octetos[3];
    console.log(this.controlador.oct1)

    const divElement = document.getElementById('modal') as HTMLInputElement;

    if (divElement !== null ) {
      divElement.checked = true;

    }
/*
    const divElement = document.getElementById('#modal-background');
    const divElement1 = document.getElementById('#modal');
      if (divElement !== null && divElement1 !== null) {
        divElement.style.display = 'block';
        divElement1.style.display = 'block';
  
      }
*/


  } 

  limpiar(){
    this.UserGroup.reset();
    this.editar = false;

  }

  cambiar_ip(){
    if(this.cambiarip){
      this.cambiarip = false;
    }
    else{
      this.cambiarip = true;
    }
  }



  actualizarHikvision(formValues: any): void {

    console.log("form: ",formValues)

    if(formValues.port==null){
      formValues.port="0";
    }

    this.dataService.actualizarHikvision(formValues)
      .subscribe(
        (res: any) => {

          this.fetchDataHikvision(this.dataService.obtener_usuario(1))

            Swal.fire({
              title: 'Controlador actualizado',
              text: '',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            

        },
        (error) => {
          console.error('Error en la solicitud:', error);
          Swal.fire({
            title: 'Error en la consulta',
            text: 'Consulte al administrador',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );

  }



  fetchDataHikvision(id_administrador: any) {

    this.loadingService.show()

   

    this.dataService.fetchDataHikvision(id_administrador).subscribe((controladores: controladores[]) => {

      //  this.mostrarGrid = true;
      this.loadingService.hide()
      this.controladores = controladores;

      //this.controladores[0].nombre += " (habilitado)";


      console.log(controladores);
    });
  }

  Agregar_fraccionamiento(controladores: {
    nombre: any
    id_controlador: any;
    id_fraccionamiento: any;
    modelo: any;
    user: any;
    password: any;
    port: any;
    oct1: any;
    oct2: any;
    oct3: any;
    oct4: any;
    ip: any;
  }) {

    if(controladores.port==null){
      controladores.port="0";
    }

    console.log(controladores);
    //controladores.id_fraccionamiento = this.dataService.obtener_usuario(1);
    //console.log("id_usuario: "+this.dataService.obtener_usuario(1));
    const headers = new HttpHeaders({ 'myHeader': 'procademy' });
    this.http.post(
      "https://localhost:44397/Hikvision/Agregar_Hikvision?" +
      "nombre=" + controladores.nombre +
      "&id_fraccionamiento=" + this.dataService.obtener_usuario(1) +
      "&user=" + controladores.user +
      "&password=" + controladores.password +
      "&port=" + controladores.port +
      "&ip=" + controladores.ip,
      { headers: headers })
      .subscribe((res) => {
        console.log(res);
        Swal.fire(
          'Controlador agregado',
          'El controlador ha sido agregado.',
          'success'
        );

        this.ngOnInit();
      });

    this.controladores.push(this.UserGroup.value);
    this.UserGroup.reset();

  }




  Eliminar_fraccionamiento(id_controlador: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el controlador "${this.nombreControlador}"? los cambios no se podrán revertir`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.eliminarControlador(id_controlador).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El controlador ha sido eliminado.',
              'success'
            );
            location.reload()
            // Opcional: Actualiza la lista o realiza otras acciones después de eliminar
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el controlador.',
              'error'
            );
          }
        });
      }
    });


  }
}
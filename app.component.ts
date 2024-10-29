import { Component } from '@angular/core';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as $ from "jquery";
import { sesion, sesions } from "../app/modelos/usuarios"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { DataService } from './data.service'
import { Router } from "@angular/router";
import { HomeComponent } from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import  emailjs  from '@emailjs/browser';


@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  httpclient: any;
  UserGroup: FormGroup;
  UserGroup1: FormGroup;
  title = 'Proyecto-Web2';
  sesion  = new sesion();
  sesions: sesions[] = [];

  Tipo_usuario: string = '';
  private _pokeService: any;
  response: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private http: HttpClient,  private fb: FormBuilder, private data: DataService, public router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.UserGroup = this.fb.group({
         username: ['', Validators.required],
         password: ['', Validators.required]
       })

       this.UserGroup1 = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        correo: ['', Validators.required],
        ppassword: ['', Validators.required]
      })
      
      
  }
/*
  
  Definir_Admin() {
    this.Tipo_usuario = 'Admin';
  }

  Definir_User() {
    this.Tipo_usuario = 'User';
  }

  Definir_Tesorero() {
    this.Tipo_usuario = 'Tesorero';
  }
*/

  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: "Deudas Ordinarias", route: "DeudasOrdinarias", icon: "border_color" },
    { name: "Deudas Extraordinarias", route: "DeudasExtraordinarias", icon: "border_color" },
    { name: "Deudores", route: "Deudores", icon: "report_problem" },
    { name: "Egresos", route: "Egresos", icon: "call_made" },
    { name: "Ingresos Extraordinarios", route: "IngresosExtraordinarios", icon: "call_received" },
    { name: 'Ingresos ordinarios', route: "IngresosOrdinarios", icon: "archive" },
    { name: 'Proveedores', route: "Proveedores", icon: "store_mall_directory" }
  ]

  private _mobileQueryListener: () => void;
  Nav: any;


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
       
    $(function () {

      $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $('#login-form-link').addClass('active');
        e.preventDefault();
      });
      $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $('#register-form-link').addClass('active');
        e.preventDefault();
      });

    });

  }


  iniciar_sesion(sesion: {username: string, password: string}){
    
    this.data.iniciar_sesion1(sesion).subscribe((sesions) => {

   console.log(sesions[0].tipo_usuario);
   console.log(sesions[0]);

      //define el tipo de usuario
   this.Tipo_usuario = sesions[0].tipo_usuario;

   localStorage.setItem("data", JSON.stringify(sesions[0]));

   

    //localStorage.setItem("data", JSON.stringify(data));

  });

}

agregar_administrador(sesion: {username: string, correo: string, password: string, ppassword: string}){
    
  if(sesion.password == sesion.ppassword){

    let direccion = "https://localhost:44397/api/Personas/Agregar_Administrador?nombre="+sesion.username+"&correo="+sesion.correo+"&contrasenia="+sesion.password;

    const headers = new HttpHeaders({'myHeader': 'procademy'});
    this.http.post(
      direccion,
       sesion, {headers: headers})
       .subscribe((res) => {
         console.log(res);
       
       });
  }
  else{ 
    console.log("error: intentalo de nuevo");
  }

}
}






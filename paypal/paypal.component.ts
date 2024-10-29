import { Component } from '@angular/core';
import { paypal } from '../modelos/paypal'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../loading-spinner/loading-spinner.service';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import { PasarelaService } from './paypal.service';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent {

  paypal: paypal[] = [];
  UserGroup: FormGroup;
  guardar: boolean = false;
  isCKVisible: boolean = false;
  isSKVisible: boolean = false;



  constructor(private fb: FormBuilder, private loadingService: LoadingService,private http: HttpClient,private dataService: DataService, private pasarelaService: PasarelaService) {

    this.UserGroup = this.fb.group({
      url: ['', Validators.required],
      secret_key: ['', Validators.required],
      client_key: ['', Validators.required]

    })
  }

  ngOnInit(){
   this.ConsultarPasarela(this.dataService.obtener_usuario(1))
  }
  
  AgregarPasarela(formValues: any){

    this.loadingService.show()

   // console.log(url, secret_key, client_key )
   console.log("https://localhost:44397/api/Pasarela/Agregar_Pasarela?url="+formValues.url+"&client_key="+formValues.client_key+"&secret_key="+formValues.secret_key)

    const headers = new HttpHeaders({'myHeader': 'procademy'});
    this.http.post("https://localhost:44397/api/Pasarela/Agregar_Pasarela?id_fraccionamiento="+this.dataService.obtener_usuario(1)+"&url="+formValues.url+"&client_key="+formValues.client_key+"&secret_key="+formValues.secret_key, {headers: headers})
      .subscribe((res) => { 
        this.loadingService.hide()

        Swal.fire({
          title: 'Información agregada',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

       // this.ConsultarGrupos();

        //this.grupo.resetForm();
      });
   
  }

  ConsultarPasarela(id_fraccionamiento: any){

    this.loadingService.show()

    this.pasarelaService.consultarPasarela(this.dataService.obtener_usuario(1)).subscribe(
      (paypal: paypal[]) => {

      this.loadingService.hide()

      this.paypal = paypal;
 
      this.UserGroup = this.fb.group({
        url: [this.paypal[0].url, Validators.required],
        secret_key: [this.paypal[0].secret_key, Validators.required],
        client_key: [this.paypal[0].client_key, Validators.required]
  
      })

      if(this.paypal.length!=null){
        this.guardar=true;
      }
      else{
        this.guardar=false;
      }


      }, 
      (error) => {
        // Manejo de errores
        console.error('Error:', error);
      }
    );
  }


  
  actualizarPasarela(formValues: any): void {

    this.pasarelaService.actualizarPasarela(this.dataService.obtener_usuario(1), formValues)
      .subscribe(
        (res: any) => {

          this.ConsultarPasarela(this.dataService.obtener_usuario(1))

            Swal.fire({
              title: 'Credenciales actualizadas correctamente',
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


  toggleCKVisibility(){
    if(!this.isCKVisible){
      this.isCKVisible = true;
    }
    else{
      this.isCKVisible = false;
    }

  }
  toggleSKVisibility(){
    if(!this.isSKVisible){
      this.isSKVisible = true;
    }
    else{
      this.isSKVisible = false;
    }
  }
}

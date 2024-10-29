import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecuperacionService } from './recuperacion.service';
import { v4 as uuidv4 } from 'uuid';
import { CorreoService } from './correo.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-recuperacion-contrasenia',
  templateUrl: './recuperacion-contrasenia.component.html',
  styleUrls: ['./recuperacion-contrasenia.component.css']
})
export class RecuperacionContraseniaComponent {

  cambioContrasenaForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private recuperacionService: RecuperacionService, private correoService:CorreoService,private router: Router) {
    
    this.cambioContrasenaForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      codigo: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', Validators.required]
    });
  }

  correo: string = '';
  codigo: string = '';
  password: string = '';
  confirmPassword: string = '';
  token: string='';
  tokenGuardado: string='';
  enviarCorreo(){
    const formValues = this.cambioContrasenaForm.value;
    this.token = uuidv4().substr(0, 5);
    this.tokenGuardado= this.token;
    

    if(this.validarCorreo()){
      this.correoService.Enviar_Correo(formValues.correo, "Tu código para recuperar tu contraseña es: \n"+this.token);
      Swal.fire({
        title: 'Correo Electrónico Enviado',
        text: 'Utiliza el codigo enviado a tu correo para reestablecer tu contraseña, !no recargues ni cambies de pagina!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }

  }

  cambiarContrasenia(){
    const formValues = this.cambioContrasenaForm.value;

    if(this.validarCorreo() && this.validarCampos()){
      if(this.tokenGuardado==this.token){
        this.recuperacionService.actualizarContrasenia(formValues.correo,formValues.contrasena).subscribe(
          (respuesta: string) => {
            //console.log('Respuesta:', respuesta);
            Swal.fire({
              title: 'Contraseña actualizada correctamente',
              text: '',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
            this.router.navigate(['../']);
          },
          (error) => {
            console.error('Error:', error);
            Swal.fire({
              title: 'Error al actualizar contraseña',
              text: error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        );
      }
    }
    
    
  }

  validarCorreo(): boolean{
    const formValues = this.cambioContrasenaForm.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(formValues.correo!=""){
      if (!emailPattern.test(formValues.correo)) {
        Swal.fire({
          title: 'Correo Electrónico no válido',
          text: 'Por favor verifica el formato del correo electronico introducido',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }else{
        return true;
      }
    }else{
      Swal.fire({
        title: 'Correo Electrónico no válido',
        text: 'No dejes el campo de correo electrónico vacío',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return false;
    }

    return false;
    

   
  }

  validarCampos(): boolean{
    const formValues = this.cambioContrasenaForm.value;
    if(formValues.correo!="" && formValues.codigo!="" && formValues.contrasena!="" && formValues.confirmarContrasena!="")
    {
      if(formValues.contrasena==formValues.confirmarContrasena){
        return true;
      }else{
        return false;
      }
    }else{
      Swal.fire({
        title: 'campos vacios_',
        text: 'Por favor no dejes ningún campo vacío',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return false;
    }

  }
  

}//fin del archivo

/*



this.recuperacionService.actualizarContrasenia("hola","hola").subscribe(
      (respuesta: string) => {
        console.log('Respuesta:', respuesta);
        
      },
      (error) => {
        console.error('Error al eliminar proveedor:', error);
      }
    );



*/

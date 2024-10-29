import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '@angular/router';
import { DeudaService } from '../ingresos-extraordinarios/deuda.service';
import { PersonasService } from '../ingresos-extraordinarios/personas.service';
import { Personas } from '../ingresos-extraordinarios/personas.model';
import Swal from 'sweetalert2';
import { Deudores } from '../ingresos-extraordinarios/deudores.model';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { deuda } from '../modelos/deudas';
import { ComprobanteService } from './comprobante.service';
 
@Component({
  selector: 'app-ingresos-ordinarios',
  templateUrl: './ingresos-ordinarios.component.html',
  styleUrls: ['./ingresos-ordinarios.component.css']
})
export class IngresosOrdinariosComponent {
  tipo_formulario:string='ordinario';
  personas: Personas[] = [];
  deudasDelUsuario : Deudores[]=[];
  deudasDelUsuarioExtra : Deudores[]=[];
  monto:number=0;
  recargo:number=0;
  total:number=0;
  fecha_corte:string='';
  fechaProximoPago:string='';
  diasAtraso:number=0;
  periodicidad:number=0;
  id_deuda:number=0;
  id_deudor:number=0;


  

constructor(private dataService:DataService,private deudaService:DeudaService,private personasService:PersonasService,public router: Router, private comprobanteService:ComprobanteService){}
ngOnInit(): void{
  this.consultarPersonas(this.dataService.obtener_usuario(3));
  console.log(this.personas);
}

consultarPersonas(idFraccionamiento: number): void {
  this.personasService.consultarPersonasPorFraccionamiento(idFraccionamiento).subscribe(
    (personas: Personas[]) => {
     this.personas = personas;
      console.log('Personas:', personas);
    },
    (error) => {
      // Manejo de errores
      console.error('Error:', error);
      Swal.fire({
        title: 'Error al consultar a las personas',
        text: 'Contacte con el administrador de la pagina',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  );
}

onChangeUsuario(event: any) {
  this.deudasDelUsuario = [];
  // Aquí puedes agregar la lógica que deseas ejecutar cuando cambia la opción seleccionada
  const valorSeleccionado = event.target.value;
  const destinatarioId = parseInt(valorSeleccionado.split(' - ')[0]);
  this.id_deudor=destinatarioId;
  this.personasService.consultarDeudorOrdinario(this.dataService.obtener_usuario(3),destinatarioId).subscribe(
    (deudasUsuario: Deudores[]) => {
     this.deudasDelUsuario = deudasUsuario
      console.log('deudas del usuario', deudasUsuario);
      if(this.deudasDelUsuario.length!=0){
        this.onChangeDeuda({ target: { selectedIndex: 0 } });
      }else{
        this.id_deuda=0;
        this.monto = 0;
        this.diasAtraso = 0;
        this.total =0;
        this.recargo=0;
        this.fechaProximoPago='';
        this.periodicidad=0;
        Swal.fire({
          title: 'El usuario seleccionado no tiene deudas ordinarias vencidas',
          text: '',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
     
    },
    (error) => {
      // Manejo de errores
      console.error('Error:', error);
    }
  );

  this.monto=0;
  this.periodicidad=0;
  this.fecha_corte='';

}

onChangeDeuda(event: any) {
  const selectedIndex = event.target.selectedIndex;
  const deudaSeleccionada = this.deudasDelUsuario[selectedIndex];
  this.id_deuda=deudaSeleccionada.id_deuda;

  this.monto = deudaSeleccionada.monto;
  this.fecha_corte = formatDate(deudaSeleccionada.proximo_pago, 'yyyy-MM-dd', 'en-US');
  this.periodicidad = deudaSeleccionada.periodicidad;
  this.recargo=deudaSeleccionada.recargo;

  // Calcular la fecha del próximo pago sumando la periodicidad a la fecha de vencimiento
  const proximoPago = new Date(deudaSeleccionada.proximo_pago); // Convertir a objeto Date
  proximoPago.setDate(proximoPago.getDate() + this.periodicidad); // Sumar la periodicidad en días

  // Formatear la fecha del próximo pago
  this.fechaProximoPago = formatDate(proximoPago, 'yyyy-MM-dd', 'en-US');

  const fechaActual = new Date(); // Fecha actual
  this.diasAtraso = Math.floor((fechaActual.getTime() - proximoPago.getTime()) / (1000 * 3600 * 24));

  // Verificar si los días de atraso son mayores que los días de gracia y agregar recargo
  if (this.diasAtraso > deudaSeleccionada.dias_gracia) {
    // Agregar el recargo al monto de la deuda
    
    this.total = deudaSeleccionada.monto + deudaSeleccionada.recargo ; // Agregar el valor de lote al recargo
  
  }else{
    this.total=deudaSeleccionada.monto
  }
 

}

pagarDeudaOrdinaria() {
  const idDeudor = this.id_deudor // Reemplaza con el ID del deudor correspondiente
  const idDeuda = this.id_deuda; // Reemplaza con el ID de la deuda correspondiente
  const idFraccionamiento = this.dataService.obtener_usuario(3); // Reemplaza con el ID del fraccionamiento correspondiente
  const proximoPago = this.fechaProximoPago; // Reemplaza con la fecha deseada en el formato correcto

  if(this.archivoSeleccionado){
 
    this.deudaService.pagarDeudaOrdinaria(idDeudor, idDeuda, idFraccionamiento, proximoPago,this.archivoSeleccionado).subscribe(
      (respuesta) => {
        if (respuesta) {
          console.log('La deuda ha sido pagada exitosamente');
          this.onChangeDeuda({ target: { selectedIndex: 0 } });
          this.onChangeUsuario({ target: { selectedIndex: 0 } });
          Swal.fire({
            title: 'La deuda ha sido pagada exitosamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              window.location.reload();
            }
          });
        } else {
          console.log('Hubo un problema al pagar la deuda');
          Swal.fire({
            title: 'Hubo un problema al pagar la deuda',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      (error) => {
        console.error('Error al intentar pagar la deuda:', error);
        Swal.fire({
          title: 'Hubo un problema al pagar la deuda',
          text: 'Por favor contactese con el administrador de la pagina',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        
      }
    );
  }else{
    Swal.fire({
      title: 'Por favor cargue un comprobante de pago',
      text: '',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    
  }
  
}





onChangeOption(event:any){
  const selectedValue = event.target.value;

  if (selectedValue === 'ordinario') {
    
  } else if (selectedValue === 'extraordinario') {
    this.router.navigate(['./PanelTesorero/IngresosExtraordinarios']);
  }
}



//Parte de cargar comprobante


imagenSeleccionada: any; // Variable para mostrar la imagen seleccionada en la interfaz
  archivoSeleccionado: File | null = null;
  imagenEnBytes: Uint8Array | null = null;
  

  handleInputFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenSeleccionada = reader.result as string;
          this.archivoSeleccionado = file; // Guardar el archivo seleccionado
          Swal.fire({
            title: 'Comprobante cargado correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

        };
        reader.readAsDataURL(file);
      }
    }
    input.value = ''; // Limpiar el input de tipo file
  }
  
  
  
  
}

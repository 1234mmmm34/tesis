import { Component, Injectable, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { deudas, deuda } from "../modelos/deudas"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { Personas } from '../ingresos-extraordinarios/personas.model';
import { PersonasService } from '../ingresos-extraordinarios/personas.service';
import Swal from 'sweetalert2';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadingService } from '../loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})
export class DeudasComponent {
  tipo_formulario: number = 0;
  httpclient: any;
  UserGroup: FormGroup;
  UserGroup2: FormGroup;
  deudas: deudas[] = [];
  deudas1: deudas[] = [];
  deuda = new deuda();
  id_deudas: any;
  destinatario: string | null = null;
  //destinatario2: string = '';
  especifico: boolean = false;
  formulario: any;
  personas: Personas[] = [];

  mostrarGrid: boolean = false;
  indice: number = 0;
  verdaderoRango: number = 6;
  cont: number = 1;

  constructor(private renderer: Renderer2, private el: ElementRef, private http: HttpClient, private dataService: DataService, private fb: FormBuilder, private personaService: PersonasService, private loadingService: LoadingService) {


    this.UserGroup = this.fb.group({ 
      fraccionamiento: ['', Validators.required],
      monto: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      dias_gracia: ['null', Validators.required],
      periodicidad: ['null', Validators.required],
      recargo: ['', Validators.required],
      proximo_pago: ['', Validators.required],
      destinatario: ['null', Validators.required],


    })

    this.UserGroup2 = this.fb.group({
      fraccionamiento: ['', Validators.required],
      monto: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      dias_gracia: ['', Validators.required],
      periodicidad: ['', Validators.required],
      recargo: ['', Validators.required],
      proximo_pago: ['', Validators.required],
      destinatario2: ['null', Validators.required],
      cboxpersonas: ['null', Validators.required],
  


    })

  }

  limpiar() {
    this.UserGroup2 = this.fb.group({
      fraccionamiento: ['', Validators.required],
      monto: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      dias_gracia: ['', Validators.required],
      periodicidad: ['', Validators.required],
      recargo: ['', Validators.required],
      proximo_pago: ['', Validators.required],
      destinatario2: ['null', Validators.required], // Cambiado a ''
      cboxpersonas: ['null', Validators.required], // Cambiado a ''
    });

    
    this.UserGroup = this.fb.group({ 
      fraccionamiento: ['', Validators.required],
      monto: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      dias_gracia: ['null', Validators.required],
      periodicidad: ['null', Validators.required],
      recargo: ['', Validators.required],
      proximo_pago: ['', Validators.required],
      destinatario: ['null', Validators.required],


    });


    this.destinatario = null;
    this.especifico = false;

  }
  

  ngOnInit(): void {

    this.fetchDataDeudas(this.dataService.obtener_usuario(1),1);
    this.consultarPersonas(this.dataService.obtener_usuario(3));
    this.tipo_formulario = 1;



  }

  pageChanged(event: any) {
    // Determinar la acción del paginator
    if (event.previousPageIndex < event.pageIndex) {
      // Se avanzó a la siguiente página
      this.paginador_adelante();
    } else if (event.previousPageIndex > event.pageIndex) {
      // Se retrocedió a la página anterior
      this.paginador_atras();
    }
  }

  paginador_atras() {

    if (this.indice - this.verdaderoRango >= 0) {

      this.deudas1 = this.deudas.slice(this.indice - this.verdaderoRango, this.indice);
      this.indice = this.indice - this.verdaderoRango;
      this.cont--;
    }
  }

  paginador_adelante() {
    if (this.deudas.length - (this.indice + this.verdaderoRango) > 0) {
      this.indice = this.indice + this.verdaderoRango;
      this.deudas1 = this.deudas.slice(this.indice, this.indice + this.verdaderoRango);
      this.cont++;
      // this.consultarNotificacion
    }

  }

  toggleCollapsible(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    const content = element.nextElementSibling as HTMLElement; // Convertir a HTMLElement
    this.renderer.addClass(element, 'active');
    if (content.style.display === 'block') {
      this.renderer.setStyle(content, 'display', 'none');
      this.renderer.removeClass(element, 'active');
    } else {
      this.renderer.setStyle(content, 'display', 'block');
    }
  }


  onChangeSelection(event: any) {
 
      this.fetchDataDeudas(this.dataService.obtener_usuario(1),event.target.value);
  
  }


  consultarPersonas(idFraccionamiento: number): void {
    this.personaService.consultarPersonasPorFraccionamiento(idFraccionamiento).subscribe(
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

  onRowClicked(lote: any) {
    this.id_deudas = lote['id_deudas']

  }



  fetchDataDeudas(id_tesorero: any, tipo_deuda: any) {
    this.loadingService.show();
    this.dataService.fetchDataDeudasExtra(id_tesorero, tipo_deuda).subscribe((deudas: deudas[]) => {
      console.log(deudas);
      this.deudas = deudas;
      this.deudas1 = this.deudas.slice(this.indice, this.indice + this.verdaderoRango);
      this.mostrarGrid = true;
      this.loadingService.hide();


    });
  }
/*
  fetchDataDeudasExtra(id_tesorero: any) {
    this.dataService.fetchDataDeudasExtra(id_tesorero).subscribe((deudas: deudas[]) => {
      console.log(deudas);
      this.deudas = deudas;
      this.deudas1 = this.deudas.slice(this.indice, this.indice + this.verdaderoRango);
    });
  }
*/

  edit(deudas: {
    id_deudas: any;
    monto: any;
    nombre: any;
    descripcion: any;
    dias_gracia: any;
    periodicidad: any;
    recargo: any;
    proximo_pago: any;
  }) {
    this.deuda.id_deudas = deudas.id_deudas;
    this.deuda.monto = deudas.monto;
    this.deuda.nombre = deudas.nombre;
    this.deuda.descripcion = deudas.descripcion;
    this.deuda.dias_gracia = deudas.dias_gracia;
    this.deuda.periodicidad = deudas.periodicidad;
    this.deuda.recargo = deudas.recargo;
    this.deuda.proximo_pago = deudas.proximo_pago;
  }

  fechaProximoPago: string = '';
  agregar_deuda(deudas: { monto: any, nombre: any, descripcion: any, dias_gracia: number, periodicidad: number, recargo: any, id_tesorero: any, id_fraccionamiento: any, proximo_pago: any, destinatario: any }) {

    const params = {
      monto: deudas.monto,
      nombre: deudas.nombre,
      descripcion: deudas.descripcion,
      dias_gracia: Number(deudas.dias_gracia),
      periodicidad: Number(deudas.periodicidad),
      recargo: deudas.recargo,
      id_tesorero: this.dataService.obtener_usuario(1),
      id_fraccionamiento: this.dataService.obtener_usuario(3),
      proximo_pago: deudas.proximo_pago,
      proximo_pago1: "string",
      destinatario: this.destinatario,
      deudor: 0,
      nombre_deudor: this.destinatario
    }

    console.log("DEUDAS", params);


    const headers = new HttpHeaders({ 'myHeader': 'procademy' });
    this.http.post(
      "https://localhost:44397/api/Deudas/Agregar_Deuda",
      params, { headers: headers })
      .subscribe((res) => {
        console.log(res);
        Swal.fire({
          title: 'Deuda agregada correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        //  this.ngOnInit(); 
        this.fetchDataDeudas(this.dataService.obtener_usuario(1),1);
        this.UserGroup.reset();
      });

  }


  borrar_deuda(id_deuda: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer. Si los usuarios han pagado la deuda, el monto se les devolverá como saldo a favor.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete("https://localhost:44397/api/Deudas/Eliminar_Deuda?id_deudas=" + id_deuda).subscribe(
          () => {
            Swal.fire({
              title: 'Deuda eliminada correctamente',
              text: '',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.UserGroup.reset();
            this.fetchDataDeudas(this.dataService.obtener_usuario(1),1);
          },
          (error) => {
            console.error('Error al eliminar la deuda:', error);
            Swal.fire({
              title: 'Error al eliminar la deuda',
              text: '',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            this.fetchDataDeudas(this.dataService.obtener_usuario(1),1);
          }
        );
      }
    });
  }

  onChangeOption2(event: any) {
    //const selectedValue = event.target.value;

    if (event.target.value == 'personalizado') {
      this.especifico = true;

      this.destinatario = null;
      //this.UserGroup2.get('cboxpersonas')?.setValue("null");
    


    } else {
      this.especifico = false;
      this.destinatario = '0';

    }


  }



  actualizar_deuda(
    deudas: { monto: number, nombre: string, descripcion: string, dias_gracia: number, periodicidad: number, recargo: number, id_deudas: number }
  ) {

    const params = {
      monto: deudas.monto,
      nombre: deudas.nombre,
      descripcion: deudas.descripcion,
      dias_gracia: deudas.dias_gracia,
      periodicidad: deudas.periodicidad,
      recargo: deudas.recargo,
      id_deudas: this.id_deudas
    };

    console.log("deudas: ", deudas)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("actualizar: ", params)

    return this.http.put("https://localhost:44397/api/Deudas/Actualizar_Deuda", params).subscribe(
      (_response) => {
        console.log("actualiza", params)
        this.ngOnInit();
        this.UserGroup.reset();

      }
    )

  }


  delete(id_deudas: any) {
    return this.http.delete("https://localhost:44397/api/Deudas/Eliminar_Deuda?id_deudas=" + id_deudas).subscribe(
      () => {
        this.fetchDataDeudas(this.dataService.obtener_usuario(1),1);

      })

  }

  /* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/
  /* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/
  /* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/


  fechaCorte_extra: string = '';
  agregar_deudaExtra(deudas: { monto: number, nombre: string, descripcion: string, dias_gracia: number, periodicidad: number, recargo: number, id_tesorero: number, id_fraccionamiento: number, proximo_pago: string, destinatario: string }) {

    deudas.dias_gracia = 0;
    deudas.periodicidad = 0;
    deudas.recargo = 0;
    deudas.proximo_pago = this.fechaCorte_extra;
    deudas.id_fraccionamiento = this.dataService.obtener_usuario(3);
    deudas.id_tesorero = this.dataService.obtener_usuario(1);
    console.log(deudas.id_tesorero);
    console.log(this.fechaCorte_extra);

    const params = {
      id_deudas: 0,
      id_fraccionamiento: deudas.id_fraccionamiento,
      id_tesorero: this.dataService.obtener_usuario(1),
      monto: deudas.monto,
      nombre: deudas.nombre,
      descripcion: deudas.descripcion,
      proximo_pago: deudas.proximo_pago,
      proximo_pago1: "s",
      dias_gracia: 0,
      periodicidad: 0,
      recargo: 0,
      deudor: 0,
      destinatario: this.destinatario,
      nombre_deudor: this.destinatario
    }

    console.log("PARAMS", params)

    const headers = new HttpHeaders({ 'myHeader': 'procademy' });
    this.http.post(
      "https://localhost:44397/api/Deudas/Agregar_DeudaExtra",
      params, { headers: headers })
      .subscribe((res) => {
        Swal.fire({
          title: 'Deuda agregada correctamente',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        console.log(res);
        //  this.ngOnInit(); 
        this.fetchDataDeudas(this.dataService.obtener_usuario(1),0);
        this.UserGroup.reset();
      });

  }



  actualizar_deudaExtra(
    deudas: { monto: number, nombre: string, descripcion: string, proximo_pago: Date, id_deudas: number }
  ) {

    const params = {
      monto: deudas.monto,
      nombre: deudas.nombre,
      descripcion: deudas.descripcion,
      id_deudas: this.id_deudas,
      proximo_pago: deudas.proximo_pago
    };

    console.log("deudas: ", deudas)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("actualizar: ", params)

    return this.http.put("https://localhost:44397/api/Deudas/Actualizar_Deuda", params).subscribe(
      (_response) => {
        console.log("actualiza", params)
        this.ngOnInit();
        this.UserGroup.reset();

      }
    )

  }



  limpiarCampos(){
    this.UserGroup.reset();
    this.UserGroup2.reset()

  }

}

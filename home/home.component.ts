import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { graficas, entradas } from '../modelos/deudas';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LoadingService } from '../loading-spinner/loading-spinner.service';
import { NotificationService } from '../notificaciones-service/notificaciones.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ngZone: any;

  showHelp: boolean = false;

  constructor(private http: HttpClient, private dataService: DataService, private loadingService: LoadingService, private notificationService: NotificationService) { }

  httpclient: any;
  graficas: graficas[] = [];
  entradas: entradas[] = [];
  title = 'angular17ssrapp';
  chart: any;
  semanaDelMes: any;
  graficas1: any;
  graficas2: any;
  rutasvg: string = './ingreso.svg';
  cuenta_cobrar: any;
  ingresos: any;
  nombre: any;
  mes: any;
  conexion: any;
  mesSeleccionado = 0;
  proyeccion_ingresos: any;
  mostrarGrid: boolean = false;
  egresos: any;


  chartOptions: any;

  meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];




  async ngOnInit() {

    // this.mesSeleccionado = 0;

    this.obtenerMesSeleccionado();

    this.sendTestNotification();

    this.nombre = this.dataService.obtener_usuario(8)


    console.log("cue: ", this.cuenta_cobrar)
    this.fetchEntradas();


    this.flujoPersonas(456);

    const fecha_actual = new Date();
    this.mes = fecha_actual.getMonth();

    this.cambiarColorBoton();

  }

  sendTestNotification() {
    this.notificationService.sendNotification('Hello from Angular!');
  }

  cambiarColorBoton(): void {
    const boton = document.getElementById("conexion");
    if (boton) {
      //const numeroAleatorio = Math.random();
      if (this.dataService.obtener_usuario(9) == false) {
        boton.classList.add("button-rojo");
        boton.classList.remove("button-verde");
        this.conexion = "sin conexion"
      } else {
        boton.classList.add("button-verde");
        boton.classList.remove("button-rojo");
        this.conexion = "conectado"

      }
    } else {
      console.error("El botón con el id 'conexion' no se encontró en el DOM.");
    }
  }




  obtenerMesSeleccionado() {

    this.loadingService.show()

    this.dataService.consultarDeudasPorCobrar(6).subscribe((graficas) => {

      if (graficas.length > 0) {
        this.mostrarGrid = true;
        this.loadingService.hide()

        console.log("graficas: ", graficas[0]);



        this.proyeccion_ingresos = graficas[0].proyeccion_ingresos;
        this.cuenta_cobrar = graficas[0].cuentas_cobrar;
        this.ingresos = graficas[0].variables + graficas[0].novariables;
        this.proyeccion_ingresos = graficas[0].proyeccion_ingresos;
        this.mesSeleccionado = graficas[0].mes;
        this.egresos = graficas[0].egresos



        localStorage.setItem("graficas", JSON.stringify(graficas[0]));



      }

    },
      (error) => {
        // Manejar errores
        Swal.close();
        // Opcional: mostrar un mensaje de error en el modal
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'SIN REGISTROS DE MESES ANTERIORES'
        })
      });



  }

  fetchEntradas() {

    this.dataService.consultarEntradas(6).subscribe((entradas: entradas[]) => {

      this.entradas = entradas
      console.log("entradas: ", this.entradas);

    });

  }




  // Llama a la función obtenerGrafica0() donde necesites obtener la primera gráfica.

  semana() {

    const fechaActual = new Date();
    const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const diaDeLaSemana = primerDiaDelMes.getDay();
    const primerSemana = Math.ceil((1 + 6 - diaDeLaSemana) / 7);
    const semanaActual = Math.ceil((fechaActual.getDate() + diaDeLaSemana) / 7);
    this.semanaDelMes = semanaActual - primerSemana - 1;
    return this.semanaDelMes
  }


  Mes() {
    // Obtener la fecha actual
    console.log("MESS: ", this.mesSeleccionado)
    const fechaActual = new Date();

    return this.mesSeleccionado

  }

  flujoPersonas(data: any): void {
    this.chartOptions = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Flujo de personas dentro de la comunidad",
        fontColor: "black",
        fontSize: 16,
        fontFamily: "tahoma",
        fontWeight: "lighter"
      },
      axisX: {
        valueFormatString: "D MMM"
      },
      axisY: {
        title: "Número de usuarios",
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: function (e: any) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "Miembros",
        xValueFormatString: "MMM DD, YYYY",
        dataPoints: [
          { x: new Date(2024, data, 1), y: data },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 2), y: 59 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 3), y: 65 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 4), y: 70 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 5), y: 71 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 6), y: 65 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 7), y: 73 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 8), y: 86 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 9), y: 74 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 10), y: 75 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 11), y: 76 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 12), y: 94 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 13), y: 87 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 14), y: 76 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 15), y: 79 }
        ]
      }, {
        type: "line",
        showInLegend: true,
        name: "Invitados",
        dataPoints: [
          { x: new Date(2024, this.dataService.obtener_graficas(9), 1), y: 60 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 2), y: 57 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 3), y: 51 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 4), y: 56 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 5), y: 54 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 6), y: 55 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 7), y: 54 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 8), y: 69 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 9), y: 65 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 10), y: 66 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 11), y: 63 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 12), y: 67 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 13), y: 66 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 14), y: 56 },
          { x: new Date(2024, this.dataService.obtener_graficas(9), 15), y: 64 }
        ]
      }]
    }
  }

  chartOptions1 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Número de deudores",
      fontColor: "black",
      fontSize: 16,
      fontFamily: "tahoma",
      fontWeight: "lighter",
    },
    axisX: {
      valueFormatString: "D MMM"
    },
    axisY: {
      title: "Número de deudores",
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "line",
      showInLegend: true,
      name: "Este mes",
      xValueFormatString: "MMM DD, YYYY",
      dataPoints: [
        { x: new Date(2024, this.dataService.obtener_graficas(9), 1), y: 63 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 2), y: 59 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 3), y: 65 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 4), y: 70 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 5), y: 71 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 6), y: 65 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 7), y: 73 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 8), y: 86 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 9), y: 74 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 10), y: 75 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 11), y: 76 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 12), y: 94 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 13), y: 87 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 14), y: 76 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 15), y: 79 }
      ]
    }, {
      type: "line",
      showInLegend: true,
      name: "Mes pasado",
      dataPoints: [
        { x: new Date(2024, this.dataService.obtener_graficas(9), 1), y: 60 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 2), y: 57 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 3), y: 51 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 4), y: 56 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 5), y: 54 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 6), y: 55 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 7), y: 54 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 8), y: 69 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 9), y: 65 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 10), y: 66 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 11), y: 63 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 12), y: 67 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 13), y: 66 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 14), y: 56 },
        { x: new Date(2024, this.dataService.obtener_graficas(9), 15), y: 64 }
      ]
    }]
  }



  chartOptions2 = {

    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Comparativa de ingresos y egresos",
      fontColor: "black",
      fontSize: 20,
      fontFamily: "tahoma"
    },
    /*
    axisX:{
      title: "Rooms"
    },
    */
    axisY: {
      title: "Porcentaje"
    },
    toolTip: {
      shared: true
    },
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      reversed: true
    },
    data: [{

      type: "stackedColumn100",
      name: "Fijos",
      showInLegend: "true",
      indexLabel: "#percent %",
      indexLabelPlacement: "inside",
      indexLabelFontColor: "white",
      color: "#25A0BE",
      dataPoints: [
        { y: this.dataService.obtener_graficas(4), label: "Ingresos ($ MXN)" },
        { y: this.dataService.obtener_graficas(10), label: "Egresos ($ MXN)" }
      ]
    }, {
      type: "stackedColumn100",
      name: "Variables",
      showInLegend: "true",
      indexLabel: "#percent %",
      indexLabelPlacement: "inside",
      indexLabelFontColor: "white",
      color: "#8A5A9E",
      dataPoints: [
        { y: this.dataService.obtener_graficas(5), label: "Ingresos ($ MXN)" },
        { y: 1000, label: "Egresos ($ MXN)" }
      ]
    }]


  }


}
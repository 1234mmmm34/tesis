import { Component } from '@angular/core';
import { deudas,deuda } from '../modelos/deudas';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-consultar-deudas',
  templateUrl: './consultar-deudas.component.html',
  styleUrls: ['./consultar-deudas.component.css']
})
export class ConsultarDeudasComponent {
  httpclient: any;
  //UserGroup: FormGroup;
  deudas: deudas[] = [];
  deuda =new deuda();
  id_deudas: any;
  tipo_formulario: string='';


  constructor(private http: HttpClient, private dataService: DataService, private loadingService: LoadingService){}

  onChangeTipoDeuda(event: any) {
    // Aquí puedes agregar la lógica que deseas ejecutar cuando cambia la opción seleccionada
    const valorSeleccionado = event.target.value;
    if(valorSeleccionado==''){
      this.fetchDataDeudas(this.dataService.obtener_usuario(1));
    }else{
      this.fetchDataDeudasExtra(this.dataService.obtener_usuario(1));
    }
  }

  ngOnInit(): void {



  }

  onRowClicked(lote: any) {
    this.id_deudas= lote['id_deudas']

  }

  fetchDataDeudas(id_tesorero: any) {
    this.dataService.fetchDataDeudasExtra(id_tesorero,1).subscribe((deudas: deudas[]) => {
      console.log(deudas);
      this.deudas = deudas;
    });
  }
  fetchDataDeudasExtra(id_tesorero: any) {
    this.dataService.fetchDataDeudasExtra(id_tesorero,0).subscribe((deudas: deudas[]) => {
      console.log(deudas);
      this.deudas = deudas;
    });
  }

  edit(deudas: {
    id_deudas: any;
    monto: any;
    nombre: any;
    descripcion: any;
    dias_gracia: any;
    periodicidad: any;
    recargo: any;
    proximo_pago: any;
  }){
    this.deuda.id_deudas = deudas.id_deudas;
    this.deuda.monto= deudas.monto;
    this.deuda.nombre= deudas.nombre;
    this.deuda.descripcion= deudas.descripcion;
    this.deuda.dias_gracia= deudas.dias_gracia;
    this.deuda.periodicidad= deudas.periodicidad;
    this.deuda.recargo= deudas.recargo;
    this.deuda.proximo_pago= deudas.proximo_pago;
  }

  delete(id_deudas: any){
    return this.http.delete("http://159.54.134.179/api/Deudas/Eliminar_Deuda?id_deudas="+id_deudas).subscribe(
      () => {
        this.fetchDataDeudas(this.dataService.obtener_usuario(1));

      })

  }
  
  deleteExtra(id_deudas: any){
    return this.http.delete("http://159.54.134.179/api/Deudas/Eliminar_Deuda?id_deudas="+id_deudas).subscribe(
      () => {
        this.fetchDataDeudasExtra(this.dataService.obtener_usuario(1));

      })

  }

}
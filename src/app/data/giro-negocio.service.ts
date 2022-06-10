import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
const basePath = "giro-negocios";

@Injectable({
  providedIn: 'root'
})
export class GiroNegocioService {


  private tipoNegocioCambio = new Subject<any[]>();
  protected mensajeCambio = new Subject<string>();

  constructor(private generic: GenericService) {

  }

  listar(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  listarPorId(id: number): Observable<any> {
    return this.generic.all(basePath).one("listar", id).get();
  }

  create(data: any): Observable<any> {
    return this.generic.all(basePath).all("registrar").post(data);
  }

  update(data: any): Observable<any> {
    return this.generic.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.generic.all(basePath).one("eliminar", id).delete();
  }


//get y set
getTipoNegocioCambio(){
  return this.tipoNegocioCambio.asObservable();
}

setTipoNegocioCambio(tipoNegocios: any[]){
  return this.tipoNegocioCambio.next(tipoNegocios);
}

getMensajeCambio(){
  return this.mensajeCambio.asObservable();
}

setMensajeCambio(mensaje: string){
  return this.mensajeCambio.next(mensaje);
}

}

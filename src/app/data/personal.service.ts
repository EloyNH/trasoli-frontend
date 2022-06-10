import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
const basePath = "personales";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private persinalCambio = new Subject<any[]>();
  protected mensajeCambio = new Subject<string>();

  constructor(private generic: GenericService) { }

  listar(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  listarPorId(id: number): Observable<any> {
    return this.generic.all(basePath).one("listar-personal-id", id).get();
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
getPersonalCambio(){
  return this.persinalCambio.asObservable();
}

setPersonalCambio(personal: any[]){
  return this.persinalCambio.next(personal);
}

getMensajeCambio(){
  return this.mensajeCambio.asObservable();
}

setMensajeCambio(mensaje: string){
  return this.mensajeCambio.next(mensaje);
}
  
}

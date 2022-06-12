import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable, Subject } from 'rxjs';

const basePath = 'representantes';

@Injectable({
  providedIn: 'root'
})
export class Replegal1Service {

  private notificarGuardado = new Subject<any[]>();

  constructor(
    private generic:GenericService
  ) { }

  //representantes
  //list-representante

  listar1():Observable<any> {
    return this.generic.all(basePath).all("list-representante").get();
  }

  create1(data: any): Observable<any> {
    return this.generic.all(basePath).all("registrar").post(data);
  }

  listarPorId1(id: number): Observable<any> {
    return this.generic.all(basePath).one("listar", id).get();
  }

  actualizar1(data:any){
    return this.generic.all(basePath).all("modificar").put(data);
  }

  //http://localhost:9091/api/representantes/eliminar/1
  eliminar1(id: number){
    return this.generic.all(basePath).one("eliminar", id).delete();
  }

    //get y set
    getNotificarGuardado1() {
      return this.notificarGuardado.asObservable();
    }
  
    setNotificarGuardado1(repLegal: any) {
      return this.notificarGuardado.next(repLegal);
    }

}

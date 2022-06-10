import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';

const basePath = 'representantes';

@Injectable({
  providedIn: 'root'
})
export class RepresentantelegalService {
  private notificarGuardado = new Subject<any[]>();

  constructor(private generic: GenericService) { }


  listar(): Observable<any> {
    return this.generic.all(basePath).all('list-representante').get();
  }

  create(data: any): Observable<any> {
    return this.generic.all(basePath).all("registrar").post(data);
  }


  //get y set
getNotificarGuardado(){
  return this.notificarGuardado.asObservable();
}

setNotificarGuardado(repLegal: any){
  return this.notificarGuardado.next(repLegal);
}

}

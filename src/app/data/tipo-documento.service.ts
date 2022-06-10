import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
const basePath = "tipo-documentos";

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(private generic: GenericService) { }

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

}

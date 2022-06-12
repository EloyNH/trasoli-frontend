import { Replegal1Service } from './replegal1.service';
import { RepresentantelegalService } from './representantelegal.service';
import { Injectable } from '@angular/core';
import { GiroNegocioService } from './giro-negocio.service';
import { MessageService } from './message.service';
import { PersonalService } from './personal.service';
import { TipoDocumentoService } from './tipo-documento.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private giroNegocio:GiroNegocioService,
    private message:MessageService,
    private personal:PersonalService,
    private tipoDocumento: TipoDocumentoService,
    private representanteLegal: RepresentantelegalService,
    private replegal1: Replegal1Service
  ) { }

  giroNegocios():GiroNegocioService{
    return this.giroNegocio;
  }

  Message():MessageService{
    return this.message;
  }

  tipoDocumentos():TipoDocumentoService{
    return this.tipoDocumento;
  }

  personales():PersonalService{
    return this.personal;
  }

  representantes():RepresentantelegalService{
    return this.representanteLegal;
  }

  representantes1():Replegal1Service{
    return this.replegal1;
  }

  
}

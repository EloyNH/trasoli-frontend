export class RepresentanteLegalBaseDatos {
  idRepresentanteLegal: number;
  numeroPartida: string;
  persona: Persona;
}

export class Persona {
  idPersona: number;
  razonSocial: string;
  numeroDocumento: string;
  direccion: string;
  correo: string;
  telefoMovil: string;
  tipoDocumento: TipoDocumento;
}

export class TipoDocumento {
  idTipoDocumento: number;
  codTipoDocumento: string;
  abreviatura: string;
  denominacion: string;
  ipMaquina?: any;
}
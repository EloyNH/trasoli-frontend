export class RepresentanteLegalDTO {
  persona: Persona;
  representanteLegal: RepresentanteLegal;
}

export class RepresentanteLegal {
  idRepresentanteLegal: number;
  numeroPartida: string;
  persona: Persona;
}

export class Persona {
  correo?: string;
  direccion?: string;
  idPersona: number;
  numeroDocumento: string;
  razonSocial: string;
  telefoMovil: string;
  tipoDocumento: TipoDocumento;
}

export class TipoDocumento {
  abreviatura: string;
  codTipoDocumento: string;
  denominacion: string;
  idTipoDocumento: number;
  ipMaquina: string;
}
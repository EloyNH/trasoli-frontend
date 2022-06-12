interface RootObject {
  persona: Persona;
  representanteLegal: RepresentanteLegal;
}

interface RepresentanteLegal {
  idRepresentanteLegal: number;
  numeroPartida: string;
  persona: Persona;
}

interface Persona {
  correo: string;
  direccion: string;
  idPersona: number;
  numeroDocumento: string;
  razonSocial: string;
  telefoMovil: string;
  tipoDocumento: TipoDocumento;
}

interface TipoDocumento {
  abreviatura: string;
  codTipoDocumento: string;
  denominacion: string;
  idTipoDocumento: number;
  ipMaquina: string;
}
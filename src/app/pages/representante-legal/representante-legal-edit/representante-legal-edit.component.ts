import { Persona, RepresentanteLegal, RepresentanteLegalDTO, TipoDocumento } from './../../../model/RepresentanteLegal';
import { TipoDocumentoService } from 'src/app/data/tipo-documento.service';
import { RepresentanteLegalComponent } from './../representante-legal.component';
import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

import { catchError, finalize } from 'rxjs/operators';
import { of, switchMap } from 'rxjs';
import { DataService } from 'src/app/data/data.service';
import { RepresentanteLegalBaseDatos } from 'src/app/model/repLegalRespuestaBD';

@Component({
  selector: 'app-representante-legal-edit',
  templateUrl: './representante-legal-edit.component.html',
  styleUrls: ['./representante-legal-edit.component.css']
})
export class RepresentanteLegalEditComponent implements OnInit {


  titulo: string = "Registrar Rep. Legal"

  form: FormGroup;

  dataRepresentanteLegal: any;

  repLegalQueVieneDeBD: RepresentanteLegalBaseDatos = new RepresentanteLegalBaseDatos();

  representanteLegalDTO: RepresentanteLegalDTO = new RepresentanteLegalDTO();
  repLegal: RepresentanteLegal = new RepresentanteLegal();
  persona: Persona = new Persona();
  tipoDocumento: TipoDocumento = new TipoDocumento();

  tipoDoc: number;


  tipoDocumentos: TipoDocumento[];

  comprobarSiEsRucboolean:boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RepresentanteLegalComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    //DATA QUE VIENE CUANDO SE PRESIONA LA OPCION EDITAR EN EL COMPONENTE PADRE
    this.dataRepresentanteLegal = this.data;

    if (this.dataRepresentanteLegal) {
      this.loadDataFrom();
    }


    this.initFormBuilder();
    this.dataService.tipoDocumentos().listar().subscribe(response => {
      this.tipoDocumentos = response;
    });
  }


  initFormBuilder() {
    this.form = this.formBuilder.group({
      idRepresentanteLegal: [null],
      numeroPartida: ['', [Validators.required]],
      idPersona: [null],
      razonSocial: ['', [Validators.required]],
      tipoDoc: new FormControl(),
      numeroDocumento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefoMovil: ['', [Validators.required]]
    });

  }

  private loadDataFrom() {
    if (this.dataRepresentanteLegal != null && this.dataRepresentanteLegal.idRepresentanteLegal > 0) {
      this.dataService.representantes().listarPorId(this.dataRepresentanteLegal.idRepresentanteLegal).subscribe(data => {
        //this.form.patchValue(data);
        this.repLegalQueVieneDeBD = data;
        //this.form.controls.numeroPartida.patchValue(this.repLegalQueVieneDeBD.numeroPartida);
        this.form.patchValue({
          idRepresentanteLegal: this.repLegalQueVieneDeBD.idRepresentanteLegal,
          numeroPartida: this.repLegalQueVieneDeBD.numeroPartida,
          idPersona: this.repLegalQueVieneDeBD.persona.idPersona,
          razonSocial: this.repLegalQueVieneDeBD.persona.razonSocial,
          //tipoDoc: this.repLegalQueVieneDeBD.persona.tipoDocumento.idTipoDocumento,
          numeroDocumento: this.repLegalQueVieneDeBD.persona.numeroDocumento,
          direccion: this.repLegalQueVieneDeBD.persona.direccion,
          correo: this.repLegalQueVieneDeBD.persona.correo,
          telefoMovil: this.repLegalQueVieneDeBD.persona.telefoMovil
        });
        this.tipoDoc = this.repLegalQueVieneDeBD.persona.tipoDocumento.idTipoDocumento;
      });
    }

    this.titulo = "Actualizar Rep. Legal"
  }


  save() {
    this.spinner.show();

    //Construye el json a enviar
    this.setdata();

    if (this.form.value.idRepresentanteLegal > 0) {
      // ACTUALIZAR
      this.dataService.representantes().actualizar(this.representanteLegalDTO).pipe(
        catchError((e) => of(null)),
        finalize(() => { this.spinner.hide(); })
      ).subscribe(response => {

        console.log(response);


        this.dataService.representantes().setNotificarGuardado(response);

        if (response) {
          this.dataService.Message().msgSuccess('Se modificado correctamente', () => {

          });
        } else {
          this.dataService.Message().msgError('Ocurrieron algunos problemas al crear el registro, por favor espere unos segundos y reintenta. ', () => {
            return;
          });
        }
      });

    } else {

      //GUARDAR

      this.dataService.representantes().create(this.representanteLegalDTO).pipe(
        catchError((e) => of(null)),
        finalize(() => { this.spinner.hide(); })
      ).subscribe(response => {

        this.dataService.representantes().setNotificarGuardado(response);

        if (response) {
          this.dataService.Message().msgSuccess('Se creo correctamente', () => {

          });
        } else {
          this.dataService.Message().msgError('Ocurrieron algunos problemas al crear el registro, por favor espere unos segundos y reintenta. ', () => {
            return;
          });
        }
      });
    }




    this.cerrar();
  }

  setdata() {
    if (this.tipoDoc != undefined) {
      this.tipoDocumento.idTipoDocumento = this.tipoDoc;

      if(this.tipoDocumentos.filter(elemento => elemento.idTipoDocumento == this.tipoDoc)[0].abreviatura == 'RUC'){

      }
    }

    this.persona.idPersona = this.form.value.idPersona;
    this.persona.razonSocial = this.form.value.razonSocial;
    this.persona.numeroDocumento = this.form.value.numeroDocumento;
    this.persona.direccion = this.form.value.direccion;
    this.persona.correo = this.form.value.correo;
    this.persona.telefoMovil = this.form.value.telefoMovil;
    this.persona.tipoDocumento = this.tipoDocumento;

    this.repLegal.idRepresentanteLegal = this.form.value.idRepresentanteLegal;
    this.repLegal.numeroPartida = this.form.value.numeroPartida;
    this.repLegal.persona = this.persona;
    //this.repLegal.persona.tipoDocumento = this.tipoDocumento;

    this.representanteLegalDTO.persona = this.persona;
    this.representanteLegalDTO.representanteLegal = this.repLegal;
  }


  cerrar(): void {
    this.dialogRef.close();
  }

  comprobarSiEsRuc() {

    if (!this.tipoDoc) {
      return false;
    } else {

      return (this.tipoDocumentos.filter(elemento => elemento.idTipoDocumento == this.tipoDoc)[0].abreviatura == 'RUC') ? true : false;
    }

  }

}

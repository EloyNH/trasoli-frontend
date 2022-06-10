import { Persona, RepresentanteLegal, RepresentanteLegalDTO, TipoDocumento } from './../../../model/RepresentanteLegal';
import { TipoDocumentoService } from 'src/app/data/tipo-documento.service';
import { RepresentanteLegalComponent } from './../representante-legal.component';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

import { catchError, finalize } from 'rxjs/operators';
import { of, switchMap } from 'rxjs';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-representante-legal-edit',
  templateUrl: './representante-legal-edit.component.html',
  styleUrls: ['./representante-legal-edit.component.css']
})
export class RepresentanteLegalEditComponent implements OnInit {


  form: FormGroup;

  representanteLegalDTO:RepresentanteLegalDTO = new RepresentanteLegalDTO();
  repLegal:RepresentanteLegal = new RepresentanteLegal();
  persona:Persona = new Persona();
  tipoDocumento:TipoDocumento = new TipoDocumento();  

  tipoDoc: number;


  tipoDocumentos:TipoDocumento[];


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RepresentanteLegalComponent>,
    private dataService:DataService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
    this.dataService.tipoDocumentos().listar().subscribe(response => {
      this.tipoDocumentos = response;
    });
  }


  initFormBuilder() {
    this.form = this.formBuilder.group({
      idRepresentanteLegal:  [null],
      numeroPartida:  [null],
      razonSocial:  [null],
      numeroDocumento:  [null],
      direccion:  [null],
      correo:  [null],
      telefoMovil:  [null]
    });
  }


  save(){
    this.spinner.show();

    this.repLegal.numeroPartida = this.form.value.numeroPartida;
    this.persona.razonSocial = this.form.value.razonSocial;
    this.persona.numeroDocumento = this.form.value.numeroDocumento;
    this.persona.direccion = this.form.value.direccion;
    this.persona.correo = this.form.value.correo;
    this.persona.telefoMovil = this.form.value.telefoMovil;
    this.tipoDocumento.idTipoDocumento = this.tipoDoc;

    this.repLegal.persona = this.persona;
    this.repLegal.persona.tipoDocumento = this.tipoDocumento;

    this.representanteLegalDTO.persona = this.persona;
    this.representanteLegalDTO.representanteLegal = this.repLegal;

    
    this.dataService.representantes().create(this.representanteLegalDTO).pipe(
      catchError((e) => of(null)),
      finalize(() => { this.spinner.hide(); })
    ).subscribe(response => {

      this.dataService.representantes().setNotificarGuardado(response);

      

      if (response) {
        this.dataService.Message().msgSuccess('Se creo correctamente', () => {

        });
      }  else {
        this.dataService.Message().msgError('Ocurrieron algunos problemas al crear el registro, por favor espere unos segundo su reintenta. ', () => {
          return;
        });
      }
    });
    

    this.cerrar();
  }


  cerrar(): void {
    this.dialogRef.close();
  }

}

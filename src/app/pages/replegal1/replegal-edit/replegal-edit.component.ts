import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data/data.service';
import { Persona, RepresentanteLegal, RepresentanteLegalDTO, TipoDocumento } from 'src/app/model/RepresentanteLegal';

import { catchError, finalize } from 'rxjs/operators';
import { of, switchMap } from 'rxjs';
import { RepresentanteLegalBaseDatos } from 'src/app/model/repLegalRespuestaBD';

@Component({
  selector: 'app-replegal-edit',
  templateUrl: './replegal-edit.component.html',
  styleUrls: ['./replegal-edit.component.css']
})
export class ReplegalEditComponent implements OnInit {

  form: FormGroup;

  titulo: string = "Registrar Rep. Legal"
  tipoDoc: number;
  tipoDocumentos: TipoDocumento[];

  dataRepresentanteLegal: any;

  representanteLegalDTO: RepresentanteLegalDTO = new RepresentanteLegalDTO();
  repLegal: RepresentanteLegal = new RepresentanteLegal();
  persona: Persona = new Persona();
  tipoDocumento: TipoDocumento = new TipoDocumento();

  repLegalQueVieneDeBD: RepresentanteLegalBaseDatos = new RepresentanteLegalBaseDatos();

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ReplegalEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.initFormBuilder()

    this.dataRepresentanteLegal = this.data;
    if (this.dataRepresentanteLegal) {
      this.loadDataFrom();
    }


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
      this.dataService.representantes1().listarPorId1(this.dataRepresentanteLegal.idRepresentanteLegal).subscribe(data => {
        //this.form.patchValue(data);
        this.repLegalQueVieneDeBD = data;
        console.log(data);
        //this.form.controls.numeroPartida.patchValue(this.repLegalQueVieneDeBD.numeroPartida);
        console.log(this.form.controls);

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

    this.setdata();

    if (this.form.value.idRepresentanteLegal > 0) {
      // ACTUALIZAR
      console.log(this.representanteLegalDTO);
      this.dataService.representantes1().actualizar1(this.representanteLegalDTO).pipe(
        catchError((e) => of(null)),
        finalize(() => { })
      ).subscribe(response => {

        console.log(response);


        this.dataService.representantes1().setNotificarGuardado1(response);

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
      console.log(this.representanteLegalDTO);

      //GUARDAR

      this.dataService.representantes1().create1(this.representanteLegalDTO).pipe(
        catchError((e) => of(null)),
        finalize(() => { })
      ).subscribe(response => {

        this.dataService.representantes1().setNotificarGuardado1(response);

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


    this.tipoDocumento.idTipoDocumento = this.tipoDoc;

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

  comprobarSiEsRuc() {

  }

  cerrar(): void {
    this.dialogRef.close();
  }

}

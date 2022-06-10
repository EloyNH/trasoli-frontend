import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css']
})
export class PersonalEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  tipoDocumentos: any[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
    this.loadTipodocumento();
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.loadDataFrom();
    });
  }


  initFormBuilder() {
    this.form = this.formBuilder.group({
      personal: this.formBuilder.group({
        idPersonal: [null]
      }),
      persona: this.formBuilder.group({
        idPersona: [null],
        razonSocial: [null,Validators.compose([Validators.required])],
        numeroDocumento: [null,Validators.compose([Validators.required])],
        telefoMovil: [null, Validators.compose([Validators.required])],
        direccion: [null, Validators.compose([Validators.required])],
        correo: [null],
        tipoDocumento: [null, Validators.compose([Validators.required])]
      })
    });
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.personales().listarPorId(this.id).subscribe(data => {
          this.form.controls['personal'].patchValue({
            idPersonal: data.idPersonal
          });
          this.buildData(data.persona);
        });
    }
  }

  buildData(data) {
    this.form.controls['persona'].patchValue({
      idPersona: data.idPersona,
      razonSocial: data.razonSocial,
      numeroDocumento: data.numeroDocumento,
      telefoMovil: data.telefoMovil,
      direccion: data.direccion,
      correo: data.correo,
      tipoDocumento: [null, Validators.compose([Validators.required])]
    });
    const tipoDocumento = this.tipoDocumentos.find(
      t => t.idTipoDocumento == data.tipoDocumento.idTipoDocumento
    );
    this.form.controls['persona'].get("tipoDocumento").setValue(tipoDocumento);
  }

  loadTipodocumento() {
    this.dataService.tipoDocumentos().listar().subscribe(data => {
        this.tipoDocumentos = data;
        console.log(this.tipoDocumentos)
      });
  }

  compareTipoDocumento(x: any, y: any): boolean {
    return x && y ? x.idTipoDocumento === y.idTipoDocumento : x === y;
  }

  cancel() {
    if (this.edicion) {
      this.router.navigate(["../../"], { relativeTo: this.route });
    } else {
      this.router.navigate(["../"], { relativeTo: this.route });
    }
  }

  save() {
    if (this.edicion) {
      this.dataService.personales().update(this.form.value).subscribe(data => {
        this.dataService.personales().listar().subscribe(p => {
          //this.dataService.providers().cambio.next(p);
          //this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });
    } else {
      console.log(this.form.value)
      this.dataService.personales().create(this.form.value).pipe(
        catchError((e) => of(null)),
        finalize(() => { })
      ).subscribe(response => {
        this.dataService.personales().getPersonalCambio();
        if (response) {
          this.dataService.Message().msgSuccess('Se creo correctamente', () => {

          });
        } /*else if (response && !response.success) {
          this.dataService.Message().msgWarning(response.message, () => {
            return;
          });
        }*/ else {
          this.dataService.Message().msgError('Ocurrieron algunos problemas al crear el registro, por favor espere unos segundo su reintenta. ', () => {
            return;
          });
        }
      });
    }
    this.cancel();
  }

}

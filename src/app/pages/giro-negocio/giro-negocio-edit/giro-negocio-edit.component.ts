import { of, switchMap } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-giro-negocio-edit',
  templateUrl: './giro-negocio-edit.component.html',
  styleUrls: ['./giro-negocio-edit.component.css']
})
export class GiroNegocioEditComponent implements OnInit {

  
  form: FormGroup;
  id: number;
  dataNegocio:any;

  constructor(
    private dataService:DataService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<GiroNegocioEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.dataNegocio=this.data;
    this.initFormBuilder();
    if (this.dataNegocio) {
      this.loadDataFrom();
    } 
    //this.dataNegocio={ ...this.data};
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idGiroNegocio: [null],
      codCiiu: [null,Validators.compose([Validators.required,Validators.minLength(4), Validators.maxLength(4)])],
      abrivatura: [null,Validators.compose([Validators.required])],
      descripcion: [null, Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom() {
    if (this.dataNegocio!=null && this.dataNegocio.idGiroNegocio>0) {
      this.dataService.giroNegocios().listarPorId(this.dataNegocio.idGiroNegocio).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  save(){
    if (this.dataNegocio!=null && this.dataNegocio.idGiroNegocio>0) {
      //console.log(this.form.value)
        this.spinner.show();
        this.dataService.giroNegocios().update(this.form.value).pipe(
          catchError((e) => of(null)),
          finalize(() => { this.spinner.hide(); })
        ).subscribe(response => {
          if (response) {
            this.dataService.Message().msgSuccess('Se modificado correctamente', () => {

            });
          } else {
            this.dataService.Message().msgError('Ocurrieron algunos problemas al modificar el grupo de clase, por favor espere unos segundo y reintenta. ', () => {
              return;
            });
          }
        });
    } else {
      this.spinner.show();
      this.dataService.giroNegocios().create(this.form.value).pipe(
        catchError((e) => of(null)),
        finalize(() => { this.spinner.hide(); })
      ).subscribe(response => {
        this.dataService.giroNegocios().getTipoNegocioCambio();
        if (response) {
          this.dataService.Message().msgSuccess('Se creo correctamente', () => {

          });
        }  else {
          this.dataService.Message().msgError('Ocurrieron algunos problemas al crear el registro, por favor espere unos segundo su reintenta. ', () => {
            return;
          });
        }
      });
    }
    this.cerrar();
  }


  cerrar(): void {
    this.dialogRef.close();
  }

}

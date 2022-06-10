import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { TipoDocumentoService } from 'src/app/data/tipo-documento.service';

@Component({
  selector: 'app-tipo-documento-edit',
  templateUrl: './tipo-documento-edit.component.html',
  styleUrls: ['./tipo-documento-edit.component.css']
})
export class TipoDocumentoEditComponent implements OnInit {

  datos:any;

  constructor(
    public dialogRef: MatDialogRef<TipoDocumentoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tipoDocumentoService:TipoDocumentoService
  ) { }

  ngOnInit(): void {
    this.datos={ ...this.data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){

  }
}

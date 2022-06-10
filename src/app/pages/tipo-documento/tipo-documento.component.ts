import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize, of } from 'rxjs';
import { DataService } from 'src/app/data/data.service';
import { TipoDocumentoService } from 'src/app/data/tipo-documento.service';
import { TipoDocumentoEditComponent } from './tipo-documento-edit/tipo-documento-edit.component';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  durationInSeconds = 5;

  listTipoDocumento: any[] = [];

  displayedColumns: string[] = ['idTipoDocumento', 'codTipoDocumento', 'abreviatura', 'denominacion','accion'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private dataService:DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarGrilla();
  }

  cargarGrilla() {
    /*this.dataService.listar().pipe(
      catchError(() => of([])),
      finalize(() => { })
    ).subscribe((response: any) => {
      if (response) {
        this.listTipoDocumento = response;
        this.setData(this.listTipoDocumento);
      }
    });*/
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(tipoDoc:any) {
    const dialogRef = this.dialog.open(TipoDocumentoEditComponent,{
      data:tipoDoc
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  eliminar(tipoDoc:any){
    console.log(tipoDoc.idTipoDocumento);
    this._snackBar.open("Producto Eliminado", 'Mensaje', { duration: 3000 });
  }

}

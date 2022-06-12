import { Component, OnInit, ViewChild } from '@angular/core';
import { RepresentanteLegalEditComponent } from './representante-legal-edit/representante-legal-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-representante-legal',
  templateUrl: './representante-legal.component.html',
  styleUrls: ['./representante-legal.component.css']
})
export class RepresentanteLegalComponent implements OnInit {

  listaRepresentanteLegal: any[] = [];

  displayedColumns: string[] = ['numeroPartida', 'razonSocial', 'denominacion', 'numeroDocumento', 'direccion', 'correo', 'telefoMovil', 'accion'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {

    this.cargarGrilla();

    //Cuando guarda tiene que consultar la base de datos
    this.dataService.representantes().getNotificarGuardado().subscribe(response => {
      this.cargarGrilla();

    });
  }

  openDialog(replegalRow?: any): void {
    const dialogRef = this.dialog.open(RepresentanteLegalEditComponent, {
      data: replegalRow,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  eliminar(replegalRow?: any): void {

    this.dataService.representantes().eliminar(replegalRow.idRepresentanteLegal)
      .subscribe(response => {
        this.cargarGrilla();
      });

  }

  cargarGrilla() {
    this.dataService.representantes().listar().pipe(
      catchError(() => of([])),
      finalize(() => { })
    ).subscribe((response: any) => {

      console.log(response);


      if (response) {
        this.listaRepresentanteLegal = response;
        this.setData(this.listaRepresentanteLegal);
      }

    });
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

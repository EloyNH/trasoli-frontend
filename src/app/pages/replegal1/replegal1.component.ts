import { Replegal1Service } from './../../data/replegal1.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/data/data.service';

import { catchError, finalize } from 'rxjs/operators';
import { of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReplegalEditComponent } from './replegal-edit/replegal-edit.component';

@Component({
  selector: 'app-replegal1',
  templateUrl: './replegal1.component.html',
  styleUrls: ['./replegal1.component.css']
})
export class Replegal1Component implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['numeroPartida', 'razonSocial', 'denominacion', 'numeroDocumento', 'direccion', 'correo', 'telefoMovil', 'accion'];

  listaRepresentanteLegal: any[] = [];

  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

  //Cuando guarda tiene que consultar la base de datos
  this.dataService.representantes1().getNotificarGuardado1().subscribe(response => {
    this.cargarGrilla();
    
  });

    this.cargarGrilla();

  }

  cargarGrilla() {
    this.dataService.representantes1().listar1().pipe(
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

  openDialog(replegalRow?: any): void {
    const dialogRef = this.dialog.open(ReplegalEditComponent, {
      data: replegalRow,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  eliminar(replegalRow?: any): void{
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

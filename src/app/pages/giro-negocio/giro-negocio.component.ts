import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, switchMap } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DataService } from 'src/app/data/data.service';
import { GiroNegocioEditComponent } from './giro-negocio-edit/giro-negocio-edit.component';

@Component({
  selector: 'app-giro-negocio',
  templateUrl: './giro-negocio.component.html',
  styleUrls: ['./giro-negocio.component.css']
})
export class GiroNegocioComponent implements OnInit {

  listaGiroNegocio: any[] = [];

  displayedColumns: string[] = ['idGiroNegocio', 'codCiiu', 'abrivatura', 'descripcion', 'accion'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.cargarGrilla();

    this.dataService.giroNegocios().getTipoNegocioCambio().subscribe(data => {
      this.setData(data);
    });
    this.dataService.giroNegocios().getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'INFO', { duration: 3000 });
    });
  }

  openDialog(giroNegocio?: any): void {
    const dialogRef = this.dialog.open(GiroNegocioEditComponent, {
      data: giroNegocio,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarGrilla();
      //this.animal = result;
    });
  }

  eliminar(giroNogocio: any) {
    this.dataService.Message().msgConfirm('¿Esta seguro de eliminar el registro?', () => {
      this.spinner.show();
      this.dataService.giroNegocios().delete(giroNogocio.idGiroNegocio).pipe(
        catchError((e) => of(null)),
        finalize(() => this.spinner.hide())
      ).subscribe(response => {
        if (response) {
          this.cargarGrilla();
          this.dataService.Message().msgSuccess('Se eminino correstamente.', () => {
            this.dataService.giroNegocios().setTipoNegocioCambio(response);
          });
        } else {
          this.dataService.Message().msgError('Ocurrieron algunos problemas al eliminar el registro, por favor espere unos segundo y reintenta.', () => { });
        }
      });
    }, () => {
    })
  }

  cargarGrilla() {
    this.dataService.giroNegocios().listar().pipe(
      catchError(() => of([])),
      finalize(() => { })
    ).subscribe((response: any) => {
      if (response) {
        this.listaGiroNegocio = response;
        this.setData(this.listaGiroNegocio);
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiroNegocioComponent } from './pages/giro-negocio/giro-negocio.component';
import { PersonalEditComponent } from './pages/personal/personal-edit/personal-edit.component';
import { PersonalListComponent } from './pages/personal/personal-list/personal-list.component';
import { TipoDocumentoEditComponent } from './pages/tipo-documento/tipo-documento-edit/tipo-documento-edit.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { RepresentanteLegalComponent } from './pages/representante-legal/representante-legal.component';

const routes: Routes = [
  {
    path: 'pages/tipoducmento', component: TipoDocumentoComponent, children: [
      { path: 'nuevo', component: TipoDocumentoEditComponent },
      { path: 'edit/id', component: TipoDocumentoComponent }
    ]
  },
  { path: 'pages/giroNegocio', component: GiroNegocioComponent },
  { path: 'pages/representantelegal', component: RepresentanteLegalComponent },
  {
    path: 'pages/personal', component: PersonalListComponent, 
    children: [
      { path: 'nuevo', component: PersonalEditComponent },
      { path: 'edit/:id', component: PersonalEditComponent }
    ]
  }

  /*{
    path: 'pages/paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent},
      { path: 'edicion/:id', component: PacienteEdicionComponent},
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { GiroNegocioComponent } from './pages/giro-negocio/giro-negocio.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TipoDocumentoEditComponent } from './pages/tipo-documento/tipo-documento-edit/tipo-documento-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GiroNegocioEditComponent } from './pages/giro-negocio/giro-negocio-edit/giro-negocio-edit.component';
import { Configuration } from 'src/config/mega.config';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PersonalListComponent } from './pages/personal/personal-list/personal-list.component';
import { PersonalEditComponent } from './pages/personal/personal-edit/personal-edit.component';
import { RepresentanteLegalComponent } from './pages/representante-legal/representante-legal.component';
import { RepresentanteLegalEditComponent } from './pages/representante-legal/representante-legal-edit/representante-legal-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TipoDocumentoComponent,
    GiroNegocioComponent,
    TipoDocumentoEditComponent,
    GiroNegocioEditComponent,
    PersonalListComponent,
    PersonalEditComponent,
    RepresentanteLegalComponent,
    RepresentanteLegalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule, //formularios
    FormsModule,
    NgxSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    Configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

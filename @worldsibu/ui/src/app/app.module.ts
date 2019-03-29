import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryComponent } from './components/history/history.component';
import { TransportComponent } from './components/transports/transports.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ParticipantService } from './services/participant.service';
import { DrugService } from './services/drug.service';
import { ParticipantComponent } from './components/participants/participants.component';
import { TransportService } from './services/transport.service';
import { ServerIdentityComponent } from './components/serverIdentity/serverIdentity.component';

@NgModule({
  declarations: [
    AppComponent,
    DrugsComponent,
    TransportComponent,
    ParticipantComponent,
    HistoryComponent,
    ServerIdentityComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ParticipantService,
    TransportService,
    DrugService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

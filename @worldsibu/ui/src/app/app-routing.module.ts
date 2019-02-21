import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugsComponent } from './components/drugs/drugs.component';
import { TransportComponent } from './components/transports/transports.component';
import { ParticipantComponent } from './components/participants/participants.component';

const routes: Routes = [
  { path: '', redirectTo: '/drugs', pathMatch: 'full' },
  { path: 'drugs', component: DrugsComponent },
  { path: 'participants', component: ParticipantComponent },
  { path: 'transports', component: TransportComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

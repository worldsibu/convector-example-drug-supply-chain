import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParticipantService {
  url = 'http://localhost:10100';
  urlParticipants = `${this.url}/participants`;
  // canActivate$ = new BehaviorSubject(this.canActivate());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  get(){
    return this.http.get(`${this.urlParticipants}`).toPromise();
  }
}

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RootStore } from '../store/root.store';

@Injectable()
export class ServerIdentityService {
  urlServerIdentity = `${environment.serverUrl}/server`;
  // canActivate$ = new BehaviorSubject(this.canActivate());

  constructor(
    private http: HttpClient,
    private rootStore: RootStore
  ) {
  }

  load() {
    return this.http.get(`${this.urlServerIdentity}`).toPromise()
      .then(item => this.rootStore.serverIdentityStore.current = item);
  }
}

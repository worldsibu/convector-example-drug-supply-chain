import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DrugService {
  urlDrugs = `${environment.serverUrl}/drugs`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  get() {
    return this.http.get(`${this.urlDrugs}`).toPromise();
  }

  create(params: { id: string, name: string }) {
    return this.http.post(`${this.urlDrugs}`, params).toPromise();
  }

  transfer(id, item) {
    return this.http.post(`${this.urlDrugs}/${id}/transfer`, item).toPromise();
  }

  getHistory(id) {
    return this.http.get(`${this.urlDrugs}/${id}/history`).toPromise();
  }
}

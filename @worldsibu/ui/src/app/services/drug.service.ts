import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DrugService {
  url = 'http://localhost:10100';
  urlDrugs = `${this.url}/drugs`;

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

  transfer(item) {
    return this.http.post(`${this.urlDrugs}/transfer`, {
      to: item.to,
      reportHash: item.hash,
      reportUrl: item.url,
      transport: item.transport
    }).toPromise();
  }

  getHistory(id) {
    return this.http.get(`${this.urlDrugs}/${id}/history`).toPromise();
  }
}

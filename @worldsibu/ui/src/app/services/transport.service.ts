import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransportService {
  url = 'http://localhost:10100';
  urlTransports = `${this.url}/transports`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  get() {
    return this.http.get(`${this.urlTransports}`).toPromise();
  }

  create(params: { id: string, name: string }) {
    return this.http.post(`${this.urlTransports}`, params).toPromise();
  }

  getHistory(id) {
    return this.http.get(`${this.urlTransports}/${id}/history`).toPromise();
  }
}

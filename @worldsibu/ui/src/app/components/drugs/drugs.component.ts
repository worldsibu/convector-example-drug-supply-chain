import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: [
    './drugs.component.css'
  ]
})
export class DrugsComponent implements OnInit {
  server = 'http://localhost:10100';
  error = '';
  items: any[] = [];
  historyItems = [];
  // This could be dynamic since we can know what users
  // are in the blockchain
  users: any[];
  addNew = false;

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  async ngOnInit() {
    setTimeout(() => { this.toastr.success('App started', 'App started') }, 0);
    this._refresh();
    this.users = (await this._loadUsers() as any);
  }

  _loadUsers() {
    return this.http.get(`${this.server}/drug/users`).toPromise();
  }

  refresh() {
    this._refresh();
  }

  transfer(item) {
    if (!item.transfer.to || !item.transfer.hash || !item.transfer.url) {
      this.toastr.warning('All details for transfer are required!');
      return;
    }
    this.toastr.info('Transferring drug');
    this.http.post(`${this.server}/drug/${item.id}/transfer`, {
      to: item.transfer.to,
      reportHash: item.transfer.hash,
      reportUrl: item.transfer.url
    }).subscribe(res => {
      item.holder = (res as any).holder;
      item.transfer = {};
      item.transferActive = false;
      this.toastr.success('Successfully transferred');
      this._refresh();
    }, err => {
      console.log(err);
      this.toastr.error(err.error.responses[0].details, 'Something happened');
    });
  }

  history(id) {
    this.toastr.info('Getting drug history');
    this.http.get(`${this.server}/drug/${id}/history`).subscribe(res => {
      console.log(res);
      this.historyItems = (res as []);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.responses[0].details, 'Something happened');
    });
  }

  create(id, name) {
    if (!id || !name) {
      alert('Please fill all the form.');
      return;
    }

    this.toastr.info('Sending transaction...');


    this.http.post(`${this.server}/drug`, { id, name })
      .subscribe(data => {
        this.toastr.success('Transaction accepted');
        (data as any).class = 'newItem';
        (data as any).transfer = {};
        this.items.push(<any>data);
        this._refresh();
      }, err => this.toastr.error((JSON.stringify(err), 'Error')));
  }

  _refresh() {
    this.http.get(`${this.server}/drug/`)
      .subscribe((data) => {
        for (const item of <any[]>(data as any)) {
          (item as any).transfer = {};
        }

        this.items = (data as any);
        // console.log(this.items);
      }, err => {
        this.error = err;
      });
  }
}

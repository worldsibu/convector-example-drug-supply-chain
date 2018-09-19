import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';



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
  // This could be dynamic since we can know what users
  // are in the blockchain
  users: any[];
  addNew = false;

  constructor(private http: HttpClient) {
  }

  async ngOnInit() {
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
      alert('All details for transfer are required!');
      return;
    }
    this.http.post(`${this.server}/drug/${item.id}/transfer`, {
      to: item.transfer.to,
      reportHash: item.transfer.hash,
      reportUrl: item.transfer.url
    }).subscribe(res => {
      item.holder = (res as any).holder;
      item.transfer = {};
      item.transferActive = false;
      this.reveal(item);
    }, err => {
      console.log(err);
      alert(err.error.responses[0].details);
    });
  }

  create(id, name) {
    if (!id || !name) {
      alert('Please fill all the form.');
      return;
    }

    this.http.post(`${this.server}/drug`, { id, name })
      .subscribe(data => {
        (data as any).class = 'newItem';
        (data as any).transfer = {};
        this.items.push(<any>data);
      }, err => alert(err));
  }

  reveal(item) {
    console.log(item);
    item.holderName = this.users.filter(user => user.id === item.holder)[0].name;
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

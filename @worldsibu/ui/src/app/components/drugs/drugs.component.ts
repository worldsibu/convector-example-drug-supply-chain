import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Drug } from '@worldsibu/convector-example-dsc-cc-drug/dist/src/drug.model';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: [
    './drugs.component.css'
  ]
})
export class DrugsComponent implements OnInit {
  error = '';
  items: Drug[];
  // This could be dynamic since we can know what users
  // are in the blockchain
  users: any[];

  constructor(private http: HttpClient) {
  }

  async ngOnInit() {
    this.users = (await this._loadUsers() as any);
    this._refresh();
  }

  _loadUsers() {
    return this.http.get('http://localhost:10100/drug/users').toPromise();
  }

  refresh() {
    this._refresh();
  }

  transfer(item) {
    if (!item.transfer.to || !item.transfer.hash || !item.transfer.url) {
      alert('All details for transfer are required!');
      return;
    }
    this.http.post(`http://localhost:10100/drug/${item.id}/transfer`, {
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
      alert(err.error.responses[0].details)
    });
  }

  create(id, name) {
    if (!id || !name) {
      alert('Please fill all the form.')
      return;
    }

    this.http.post('http://localhost:10100/drug', {
      id: id, name: name
    }).subscribe(data => {
      (data as any).class = 'newItem';
      (data as any).transfer = {};
      this.items.push(<Drug>data);
    },
      err => alert(err));

  }

  reveal(item) {
    console.log(item);
    item.holderName = this.users.filter(user => user.id === item.holder)[0].name;
  }

  _refresh() {
    this.http.get('http://localhost:10100/drug/').subscribe((data) => {
      for (let item of <Drug[]>(data as any)) {
        (item as any).transfer = {};
      }
      this.items = (data as any);
      //console.log(this.items);
    }, err => {
      this.error = err;
    });
  }

}

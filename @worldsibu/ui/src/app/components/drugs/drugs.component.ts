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
  error = '';
  items: any[];
  // This could be dynamic since we can know what users
  // are in the blockchain
  users = [
    {
      id: 'E3:8C:54:5E:3E:9F:4B:77:7B:A2:29:58:A7:8C:BD:FF:45:A7:0F:EA',
      name: 'Manufacturer Acme',
      ref: 'org1:user1'
    }, {
      id: '7F:63:E0:B8:12:F1:28:6C:30:C4:5F:65:F3:77:59:9C:C7:74:47:02',
      name: 'Springfield General Hospital',
      ref: 'org1:user2'
    },
    {
      id: '2E:9A:7F:A9:89:FE:19:0F:A1:80:98:C9:04:B1:27:DE:03:21:E7:8B',
      name: 'Manufacturer Coyote',
      ref: 'org1:user3'
    },
    {
      id: '80:0D:FB:4A:94:B4:75:01:8E:AE:9B:01:3C:A5:2A:8A:BD:34:A5:83',
      name: 'Pharmacy White',
      ref: 'org2:user1'
    },
    {
      id: '1C:46:CF:46:2C:4B:36:D9:04:AC:49:AE:90:AB:18:CA:D0:A8:B6:29',
      name: 'Warehouse Gus',
      ref: 'org2:user2'
    },
    {
      id: '1C:67:36:D0:59:77:9D:B3:68:DA:A4:7A:4E:06:3C:F7:6E:8C:BB:80',
      name: 'Distributor Pinkman',
      ref: 'org2:user3'
    }
  ];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this._refresh();
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
      this.items.push(data);
    },
      err => alert(err));

  }

  reveal(item) {
    console.log(item);
    item.holderName = this.users.filter(user => user.id === item.holder)[0].name;
  }

  _refresh() {
    this.http.get('http://localhost:10100/drug/').subscribe((data) => {
      for (let item of (data as any)) {
        item.transfer = {};
      }
      this.items = (data as any);
      console.log(this.items);
    }, err => {
      this.error = err;
    });
  }

}

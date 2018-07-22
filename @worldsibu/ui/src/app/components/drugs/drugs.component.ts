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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this._refresh();
  }

  refresh() {
    this._refresh();
  }

  transfer(item) {
    console.log(item);
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

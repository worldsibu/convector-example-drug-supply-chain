import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: [
    './drugs.component.css'
  ]
})
export class DrugsComponent implements OnInit {
  ngOnInit(): void {

  }

  constructor(http: HttpClient) {
  }

}

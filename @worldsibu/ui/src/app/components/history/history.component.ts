import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: [
    './history.component.css'
  ]
})
export class HistoryComponent implements OnInit {
  @Input() items;
  ngOnInit(): void {
  }

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }
}

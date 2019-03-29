import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ParticipantService } from '../../services/participant.service';
import { DrugService } from '../../services/drug.service';
import { TransportService } from '../../services/transport.service';

@Component({
  selector: 'app-server-identity',
  templateUrl: './serverIdentity.component.html',
  styleUrls: [
    './serverIdentity.component.css'
  ]
})

export class ServerIdentityComponent implements OnInit {
  constructor(
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }
}

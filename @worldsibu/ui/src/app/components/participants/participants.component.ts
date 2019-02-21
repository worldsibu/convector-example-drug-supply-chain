import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ParticipantService } from '../../services/participant.service';
import { DrugService } from '../../services/drug.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: [
    './participants.component.css'
  ]
})
export class ParticipantComponent implements OnInit {
  items = [];

  constructor(
    private participantSvc: ParticipantService,
    private toastr: ToastrService) {
  }

  async ngOnInit() {
    this.participantSvc.get().then(res => {
      this.items = (res as []);
      this.toastr.success('Participants loaded');
    });
  }
}

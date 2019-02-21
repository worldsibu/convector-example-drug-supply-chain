import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ParticipantService } from '../../services/participant.service';
import { TransportService } from '../../services/transport.service';

@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: [
    './transports.component.css'
  ]
})
export class TransportComponent implements OnInit {
  error = '';
  items: any[] = [];
  newItem = {
    company: {}
  };
  historyItems = [];
  // This could be dynamic since we can know what users
  // are in the blockchain
  participants: any[];
  addNew = false;

  constructor(private http: HttpClient,
    private participantSvc: ParticipantService,
    private transportSvc: TransportService,
    private toastr: ToastrService) {
  }

  async ngOnInit() {
    this._refresh();
    this.participants = (await this._loadUsers() as any);
  }

  _loadUsers() {
    return this.participantSvc.get();
  }

  refresh() {
    // this._refresh();
  }

  create(item) {
    console.log(item);
    if (!item.company.id ||
      !item.company.name ||
      !item.ownerId ||
      !item.transportType) {
      this.toastr.warning('Please fill all the form.');
      return;
    }
    this.toastr.info('Sending transaction...');
    this.transportSvc.create(item)
      .then(data => {
        this.toastr.success('Transaction accepted');
        (data as any).class = 'newItem';
        this.items.push(<any>data);
        this._refresh();
      }, err => this.toastr.error((JSON.stringify(err), 'Error')));
  }

  _refresh() {
    this.transportSvc.get()
      .then((data) => {
        for (const item of <any[]>(data as any)) {
          (item as any).transfer = {};
        }

        this.items = (data as any);
        this.toastr.success('Transports loaded');
      }, err => {
        this.error = err;
      });
  }
}

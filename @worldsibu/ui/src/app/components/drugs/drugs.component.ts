import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ParticipantService } from '../../services/participant.service';
import { DrugService } from '../../services/drug.service';
import { TransportService } from '../../services/transport.service';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: [
    './drugs.component.css'
  ]
})
export class DrugsComponent implements OnInit {
  error = '';
  newItem: any = {};
  items: any[] = [];
  historyItems: any[] = [];
  // This could be dynamic since we can know what users
  // are in the blockchain
  users: any[];
  addNew = false;
  transports: any[] = [];

  constructor(private http: HttpClient,
    private participantSvc: ParticipantService,
    private transportSvc: TransportService,
    private drugSvc: DrugService,
    private toastr: ToastrService) {
  }

  async ngOnInit() {
    this._refresh();
    this.users = (await this._loadUsers() as any);
  }

  _loadUsers() {
    return this.participantSvc.get();
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

    this.drugSvc.transfer(item.id, {
      to: item.transfer.to,
      reportHash: item.transfer.hash,
      reportUrl: item.transfer.url,
      transportId: item.transfer.transportId,
    }).then(res => {
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
    this.drugSvc.getHistory(id).then(res => {
      console.log(res);
      this.historyItems = (res as []);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.responses[0].details, 'Something happened');
    });
  }

  create(item) {
    if (!item.id || !item.name) {
      alert('Please fill all the form.');
      return;
    }

    this.toastr.info('Sending transaction...');

    this.drugSvc.create(item).then(data => {
      this.toastr.success('Transaction accepted');
      (data as any).class = 'newItem';
      (data as any).transfer = {};
      this.items.push(<any>data);
      this._refresh();
      var closeModal = document.getElementById('closeModal');
      closeModal.click();
    }, err => this.toastr.error((JSON.stringify(err), 'Error')));
  }

  _refresh() {
    this.drugSvc.get().then((data) => {
      for (const item of <any[]>(data as any)) {
        (item as any).transfer = {};
      }
      this.items = (data as any);
      this.toastr.success('Drugs loaded');
    }, err => {
      this.error = err;
    });

    this.transportSvc.get().then(rs => this.transports = (rs as []));
  }
}

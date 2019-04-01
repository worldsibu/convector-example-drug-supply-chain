import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServerIdentityService } from '../../services/serverIdentity';
import { RootStore } from '../../store/root.store';

@Component({
  selector: 'app-server-identity',
  templateUrl: './serverIdentity.component.html',
  styleUrls: [
    './serverIdentity.component.css'
  ]
})

export class ServerIdentityComponent implements OnInit {
  constructor(public store: RootStore,
    private serverIdentity: ServerIdentityService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.serverIdentity.load();
  }
}

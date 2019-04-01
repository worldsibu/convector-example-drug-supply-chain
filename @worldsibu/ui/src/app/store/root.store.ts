import { computed } from 'mobx';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServerIdentityStore } from './serverIdentity.store';

@Injectable()
export class RootStore {
  serverIdentityStore: ServerIdentityStore;
  constructor() {
    this.serverIdentityStore = new ServerIdentityStore();
  }

  observe<T>(expression: () => T): Observable<T> {
    return new Observable(observer => {
      const computedValue = computed(expression);
      const disposer = computedValue.observe(changes => {
        observer.next(changes.newValue);
      }, true);

      return () => {
        disposer && disposer();
      }
    });
  }
}

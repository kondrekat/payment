import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Transaction } from '../classes/transaction';

const KEY = "MYUNICKEY";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private transaction = new BehaviorSubject<Transaction>(null);

  constructor() { }

  addTransaction(transaction: Transaction): void {
    let items = JSON.parse(localStorage.getItem(KEY));
    if (!items) items = [];
    items.push(transaction);
    localStorage.setItem(KEY, JSON.stringify(items));
    console.log(Array.from(JSON.parse(localStorage.getItem(KEY))));
  }

  getAllTransactions(): Transaction[] {
    return JSON.parse(localStorage.getItem(KEY));
  }

  remove(i: number) {
    let items = JSON.parse(localStorage.getItem(KEY));
    items.splice(i, 1);
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  repeat(i: number) {
    let items = JSON.parse(localStorage.getItem(KEY));
    this.transaction.next(items[i]);
  }

  getTransaction(): Observable<Transaction> {;
    console.log('getTransaction');
    return this.transaction.asObservable();
  }

}

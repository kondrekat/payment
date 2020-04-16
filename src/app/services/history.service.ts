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
    this.clear();
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

  clear() {
    this.transaction.next(null);
  }

  getTransaction(): Observable<Transaction> {
    return this.transaction.asObservable();
  }

}

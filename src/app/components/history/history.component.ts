import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HistoryService } from 'src/app/services/history.service';
import { Transaction } from 'src/app/classes/transaction';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  transations: Transaction[];

  constructor(private router: Router, private historyService: HistoryService) { }

  ngOnInit() {
    this.transations = this.historyService.getAllTransactions();
  }

  repeat(i: number) {
    this.historyService.repeat(i);
  }

  remove (i: number) {
    this.historyService.remove(i);
    this.transations = this.historyService.getAllTransactions();
  }
}

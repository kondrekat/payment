import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { Transaction } from 'src/app/classes/transaction';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  subscription: Subscription;

  constructor(private router: Router, private historyService: HistoryService) { 
    this.subscription = this.historyService.getTransaction().subscribe(t => { console.log('t') }, t => { console.log('e') });
  }

  ngOnInit() {
  }

  onSelect(event:any): void {
    console.log('onSelect card', event);
    // this.router.navigate(['/history']);
  }

  onSubmit(f: NgForm) {
    this.historyService.addTransaction({
      srcCardNumber: f.value.sn1+f.value.sn2+f.value.sn3+f.value.sn4,
      dstCardNamber: f.value.dn1+f.value.dn2+f.value.dn3+f.value.dn4,
      name: f.value.name,
      summ: f.value.money,
      endDate: f.value.endMonth+f.value.endYear,
      date: new Date()
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}

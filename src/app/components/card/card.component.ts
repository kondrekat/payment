import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  subscription: Subscription;
  t: any
   form = new FormGroup({
    sn1: new FormControl(''),
    sn2: new FormControl(''),
    sn3: new FormControl(''),
    sn4: new FormControl(''),
    dn1: new FormControl(''),
    dn2: new FormControl(''),
    dn3: new FormControl(''),
    dn4: new FormControl(''),
    name: new FormControl(''),
    money: new FormControl(''),
    endMonth: new FormControl(''),
    endYear: new FormControl(''),
  });

  constructor(private historyService: HistoryService) { 
    this.subscription = this.historyService.getTransaction().subscribe(t => { 
      if (t) {
        this.form.controls['sn1'].setValue(t.srcCardNumber.slice(0, 4)); 
        this.form.controls['sn2'].setValue(t.srcCardNumber.slice(4, 8)); 
        this.form.controls['sn3'].setValue(t.srcCardNumber.slice(8, 12)); 
        this.form.controls['sn4'].setValue(t.srcCardNumber.slice(12, 16)); 
        this.form.controls['dn1'].setValue(t.dstCardNamber.slice(0, 4)); 
        this.form.controls['dn2'].setValue(t.dstCardNamber.slice(4, 8)); 
        this.form.controls['dn3'].setValue(t.dstCardNamber.slice(8, 12)); 
        this.form.controls['dn4'].setValue(t.dstCardNamber.slice(12, 16)); 
        this.form.controls['name'].setValue(t.name); 
        this.form.controls['money'].setValue(t.summ);
        this.form.controls['endMonth'].setValue(t.endDate.slice(0, 2));
        this.form.controls['endYear'].setValue(t.endDate.slice(2, 4));
      } else {
        this.form.controls['sn1'].setValue(null); 
        this.form.controls['sn2'].setValue(null); 
        this.form.controls['sn3'].setValue(null); 
        this.form.controls['sn4'].setValue(null); 
        this.form.controls['dn1'].setValue(null); 
        this.form.controls['dn2'].setValue(null); 
        this.form.controls['dn3'].setValue(null); 
        this.form.controls['dn4'].setValue(null); 
        this.form.controls['name'].setValue(null); 
        this.form.controls['money'].setValue(null);
        this.form.controls['endMonth'].setValue(null);
        this.form.controls['endYear'].setValue(null);
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.historyService.addTransaction({
      srcCardNumber: this.form.value.sn1 + this.form.value.sn2 + this.form.value.sn3 + this.form.value.sn4,
      dstCardNamber: this.form.value.dn1 + this.form.value.dn2 + this.form.value.dn3 + this.form.value.dn4,
      name: this.form.value.name,
      summ: this.form.value.money,
      endDate: this.form.value.endMonth + this.form.value.endYear,
      date: new Date()
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}

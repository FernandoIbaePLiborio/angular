import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {
  
  rating: boolean

  constructor() { }

  ngOnInit() {
  }

  rate(){
    this.rating = true;
  }

}

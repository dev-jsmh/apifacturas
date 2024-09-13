import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-reduce-quantity',
  templateUrl: './add-reduce-quantity.component.html',
  styleUrls: ['./add-reduce-quantity.component.css']
})
export class AddReduceQuantityComponent {

  @Output()
  public count: number = 0;

  @Input()
  public quantity: number = 0;


  add( ) {
    this.count = this.quantity += 1;
    console.log( "add " + this.quantity );
    console.log( "count " + this.count);
  }

  reduce(  ) {
    if (this.count > 0) {
      this.count = this.quantity -= 1;
      console.log( "remove " + 1);
      console.log( "count " + this.count);
    }
  }

}

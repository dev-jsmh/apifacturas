import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillDetailEntity } from 'src/app/models/BillDetailEntity';

@Component({
  selector: 'app-add-reduce-detail-quantity',
  templateUrl: './add-reduce-detail-quantity.component.html',
  styleUrls: ['./add-reduce-detail-quantity.component.css']
})
export class AddReduceDetailQuantityComponent {

  

  @Output() onDetailChange = new EventEmitter<BillDetailEntity>();

  @Input()
  public currentTdetail!: BillDetailEntity;

  constructor() {
  }

  add() {

    if (this.currentTdetail.quantity !== undefined) {
      // updated the quantity
      this.currentTdetail.quantity++;
      // updated the total price also
      this.currentTdetail.totalValue = this.currentTdetail.quantity * this.currentTdetail.unitValue!;
      // emit and event with the updated values of the details
      this.onDetailChange.emit(this.currentTdetail);
    }
  }

  reduce() {
    if (this.currentTdetail.quantity !== undefined && this.currentTdetail.quantity > 0) {
      // updated the quantity
      this.currentTdetail.quantity--;
      // updated the total price also
      this.currentTdetail.totalValue = this.currentTdetail.quantity * this.currentTdetail.unitValue!;
      // emit and event with the updated values of the details
      this.onDetailChange.emit(this.currentTdetail);
    }
  }
}

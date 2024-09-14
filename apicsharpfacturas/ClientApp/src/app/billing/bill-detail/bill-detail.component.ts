import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillDetailEntity } from 'src/app/models/BillDetailEntity';

import { ProductEntity } from 'src/app/models/ProductEntity';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent {


  @Output() newDetail = new EventEmitter<BillDetailEntity>();  

  @Input()
  public product?: ProductEntity;

  public detail: BillDetailEntity = new BillDetailEntity();

  constructor(){

    this.detail.product = this.product;
    this.detail.unitValue = this.product?.price;
    this.detail.quantity = 0;
    this.detail.totalValue = this.product?.price || 0 * this.detail?.quantity;
  }

  add( ) {
   
    if(this.detail.quantity == undefined){
      this.detail.quantity = 0;
      this.detail.quantity++;
      console.log( " se agrego " + 1 + " al product id: " + this.detail.product?.id  );
      this.newDetail.emit(this.detail);
    }else{
      console.log( " se agrego " + 1 + " al product id: " + this.detail.product?.id  );
      this.newDetail.emit(this.detail);
      this.detail.quantity++
    }
  }

  reduce(  ) {
    if(this.detail.quantity !== undefined && this.detail.quantity  > 0 ){
      this.detail.quantity--
  
      console.log( " se removio " + 1 + " al product id: " + this.detail.product?.id  );
      this.newDetail.emit(this.detail);
    }else if( this.detail.quantity !== undefined && this.detail.quantity  > 0 ){
      this.detail.quantity--
      console.log( " se removio " + 1 + " al product id: " + this.detail.product?.id  );
      this.newDetail.emit(this.detail);
     
    }
  }


}

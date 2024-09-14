import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// models
import { ProductEntity } from '../models/ProductEntity';
import { BillDetailEntity } from '../models/BillDetailEntity';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private http: HttpClient
  ) { }


  // map product to details 
  public mapProductToBillDetailList(productList: ProductEntity[]) {

    // bill details list 
    let DetailList: BillDetailEntity[] = [];

    // map the product list form request to BillDetialEntity array
    productList.map((p) => {

      // 
      let detail: BillDetailEntity = new BillDetailEntity();

      // map properties
      detail.product = p;
      detail.quantity = 0;
      detail.unitValue = p.price;
      detail.totalValue = 0;
      // push the detail to list 
      DetailList.push(detail);
    });

    if (DetailList != null) {

      // return lis of details 
      return DetailList;
    } else {
      return DetailList;
    }

  }





}

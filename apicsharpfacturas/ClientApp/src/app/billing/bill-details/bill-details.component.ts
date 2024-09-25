import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillEntity } from 'src/app/models/BillEntity';
import { BillService } from 'src/app/services/bill.service';
import { Location } from '@angular/common';
import { BillDetailEntity } from 'src/app/models/BillDetailEntity';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {

  public billId = '';
  public currentBill: BillEntity = new BillEntity();
  public totalNumberOfProducts = 0;

  // ============= inject dependencies 
  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {


    // this bill id from route
    this.route.params.subscribe({
      next: (params) => {
        this.billId = params['id'];
        console.log("Id of current bill " + this.billId);
      }, error(err) {
        console.log("Not posible to get bill id from route !");
        console.log(err);
      },
    });
    // make get by id request
    this.billService.getById(this.billId).subscribe({
      next: (res: any) => {
        // set response to bill 
        this.currentBill = res;

        this.totalNumberOfProducts = this.totalItems( this.currentBill.details! );

        console.log(this.currentBill);
      },
      error: (ex) => {
        console.log("Error when trying to get the bill information from back-end api.");
        console.log(ex);
      }
    })
  }

  // go back to previous location
  public goBack() {
    this.location.back();
  }

  // get total items
  totalItems(list: BillDetailEntity[]) {

    let totalItems = 0;
    // loop trougth the list
    list.map(item => {
      /* extract the total number of items for each product
      and acumulate the total number of items bought in the bill
      */
      totalItems += item.quantity!;
    });
    // return the total number of items
    return totalItems;
  }
}

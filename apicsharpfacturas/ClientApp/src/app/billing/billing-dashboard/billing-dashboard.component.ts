import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BillEntity } from 'src/app/models/BillEntity';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css'],

})
export class BillingDashboardComponent {

  public billList: BillEntity[] = [];

  constructor( private billService: BillService) {


    // get all bill

    this.billService.getAll().subscribe({
      next: (res: any) => {
        this.billList = res;
        console.log(res);
      },
      error(ex: any) {
        console.log(ex);
      }
    });

  }



}

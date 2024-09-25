
import { Component, OnInit } from '@angular/core';

// import DataTable from 'datatables.net-dt';
import { BillEntity } from 'src/app/models/BillEntity';
import { BillService } from 'src/app/services/bill.service';

import DataTable from 'datatables.net-dt';
import { Button } from 'bootstrap';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css'],

})
export class BillingDashboardComponent implements OnInit {

  public billList: BillEntity[] = [];
  public values: any[] = [];

  public table!: any;

  constructor(private billService: BillService) {



  }

  ngOnInit() {
    // initialize the table when the angular component is contructed
    /* passed the id of the table and an object with config
    this.table = new DataTable('#billsTable',
      {
        columns: [
          { title: 'id' },
          { title: 'fecha' },
          { title: 'sub-total' },
          { title: 'descuento' },
          { title: 'valor a pagar' }
          // passed data got from request to api
        ],
        data: [
          ["sdf", "sdf", "sdf", "sdf", "sdf"],
          ["sdf", "sdf", "sdf", "sdf", "sdf"],
          ["sdf", "sdf", "sdf", "sdf", "sdf"],
          ["sdf", "sdf", "sdf", "sdf", "sdf"]
        ]

      }
    );*/
    // extract the neccessary information from the api request

    this.billService.getAll().subscribe({
      next: (res: any) => {
        this.billList = res;
        console.log(this.billList);
        // initialize the table when the angular component is contructed
        this.table = new DataTable('#billsTable', {
          columns: [
            { title: 'id' },
            { title: 'fecha' },
            { title: 'sub-total' },
            { title: 'descuento' },
            { title: 'valor a pagar' },
           { title: 'Acciones'}
            // passed data got from request to api
          ]
        });

        // go trough every element of the array
        for (var index = 0; index < this.billList.length; index++) {
          // create an subArray 
          let row = [];
          // get the desired properties and push then inside the subArray
          row.push(this.billList[index].id?.toString());
          // convert the sql date format with the Date() object
          // push formated date to row 
          row.push(this.billService.formatDate(this.billList[index].date!.toString()));
          row.push(this.billList[index].subTotal);
          row.push(this.billList[index].discount);
          row.push(this.billList[index].totalValue);
         row.push("<a class='btn btn-primary' href=#/billing-dashboard/" + this.billList[index].id + "/details>detalles</a>");
          // push the subArray to the main one
          this.values.push(row);
          /// print every row in the console 
          console.log(row);
          // add a new column to table
         
          // add row to table directly
          this.table.row.add(row);
          this.table.draw();

        };
        console.log(this.values);
      },
      error(ex: any) {
        console.log(ex);
      }
    });



  }


}

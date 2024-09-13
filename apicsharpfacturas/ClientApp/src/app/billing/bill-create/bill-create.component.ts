import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { AddReduceQuantityComponent } from 'src/app/components/add-reduce-quantity/add-reduce-quantity.component';
import { BillService } from 'src/app/services/bill.service';
import { BillDetailEntity } from 'src/app/models/BillDetailEntity';

@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.css']
})
export class BillCreateComponent {

  public clientId = '';
  public currentClient: ClientEntity = new ClientEntity();
  // list of products 
  public productList: ProductEntity[] = [];
  // public list of detail 
  public detailList: BillDetailEntity[] = [];

  // =============== constructor ===============
  // inject dependencies within the constructor 
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private productService: ProductService,
    private dillService: BillService
  ) {

    // extract id from route
    this.route.params.subscribe({
      next: (params) => {
        this.clientId = params['id'];
      },
      error: (ex) => {
        console.log("Error when trying to get the request client from back-end api");
        console.log(ex);
      }
    });

    // make request to back-end for client
    this.clientService.getById(this.clientId).subscribe({
      next: (res: any) => {
        // set response to the currentClient variable
        this.currentClient = res;
        console.log("detalles del cliente. ");
        console.log(this.currentClient);
      },
      error: (ex) => {
        console.log("Error al intentar obtener los datos del cliente");
        console.log(ex);
      }
    });

    // make request for product list 
    this.productService.getAll().subscribe({
      next: (res: any) => {
        this.productList = res;
        console.log("List of products map to details: ");

        // call service to map product to detail
        this.detailList = this.dillService.mapProductToBillDetailList(this.productList);

        console.log(this.detailList);

        this.detailList[0].ProductEntity?.id

      },
      error: (ex) => {
        console.log("Error when trying to get products from back-end api");
        console.log(ex);
      }
    });



  }






}

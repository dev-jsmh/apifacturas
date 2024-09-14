import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
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
  public detailList: BillDetailEntity[] = []
  // products to purchase
  public wantedProducts: ProductEntity[] = [];

  // data of bill
  public billSubTotal: number = 0;
  public billDiscount: number = 0;
  public billTotal = 0;

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
      error: (ex: any) => {
        console.log("Error al intentar obtener los datos del cliente");
        console.log(ex);
      }
    });

    // make request for product list 
    this.productService.getAll().subscribe({
      next: (res: any) => {
        this.productList = res;
        console.log("List of products map to details: ");

        console.log(this.detailList);

        // this.detailList[0].ProductEntity?.id

      },
      error: (ex: any) => {
        console.log("Error when trying to get products from back-end api");
        console.log(ex);
      }
    });

  }

  addToList(p: ProductEntity) {

    const detail = new BillDetailEntity();

    // checke if product already exists
    if (this.wantedProducts.includes(p)) {
      console.log("product exist");
    } else {

      // mapp the product to bill detail
      detail.product = p;
      detail.quantity = 1;
      detail.unitValue = p!.price;
      if (p.price) {
        detail.totalValue = detail.quantity * p.price;
      }
      this.wantedProducts.push(p);
      this.detailList.push(detail);
      console.log("adding detail to list.... ");

    }
    console.log(this.detailList);


  }

  calculateTotal() {
    // calculate subtotal
    for (let i = 0; this.detailList.length > i; i++) {


console.log(this.detailList[i]);
      this.billSubTotal += this.detailList[i].totalValue!;

      /*
            const t = this.detailList[i].totalValue;
      
            if (t != undefined) {
              this.billSubTotal += t;
            }*/
    }
  }




}

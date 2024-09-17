import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { BillService } from 'src/app/services/bill.service';
import { BillDetailEntity } from 'src/app/models/BillDetailEntity';
import { FormControl, Validators } from '@angular/forms';
import { BillEntity } from 'src/app/models/BillEntity';


@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.css']
})
export class BillCreateComponent {

  DateIsSet = true;
  public detailsAreEmpty = false;
  public clientId = '';
  public currentClient: ClientEntity = new ClientEntity();

  // list of products 
  public productList: ProductEntity[] = [];
  // public list of detail 
  public detailList: BillDetailEntity[] = []
  // products to purchase
  public wantedProducts: ProductEntity[] = [];
  ///  =========================== bill form ===========================
  public billDiscount: FormControl = new FormControl(0, Validators.required);
  public billDate: FormControl = new FormControl('', Validators.required);

  // data of bill
  public billSubTotal: number = 0;
  public billTotal = 0;

  // =============== constructor ===============
  // inject dependencies within the constructor 
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private productService: ProductService,
    private billService: BillService,
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
        console.log("List of products: ");
        // console.log(this.productList);

        // this.detailList[0].ProductEntity?.id

      },
      error: (ex: any) => {
        console.log("Error when trying to get products from back-end api");
        console.log(ex);
      }
    });

  }

  /// add product to list of wantedProducts. Then create a new detail and add it to detailList array
  addToList(p: ProductEntity) {

    const detail = new BillDetailEntity();
    // checke if product already exists
    if (this.wantedProducts.includes(p)) {
      console.log("product exist on wantedProductList");
    } else {
      // mapp the product to bill detail
      detail.product = p;
      detail.quantity = 1;
      detail.unitValue = p!.price;
      detail.totalValue = detail.unitValue! * detail.quantity;
      this.wantedProducts.push(p);
      this.detailList.push(detail);
      console.log("adding detail to list.... ");
    }
    // refresh total value of bill
    this.calculateTotal();
  }

  updateDetail(event: BillDetailEntity) {
    /*
    // filter the array and return a new one with all elements but not the updated one
    this.detailList = this.detailList.filter(detail => detail.product!.id !== event.product!.id);
    // push the update detail comming from the event
    this.detailList.push(event);
    // refresh total value of bill
    this.calculateTotal();

    */
    const updatedDetailLit = this.detailList.map(d => {
      if (d.product!.id === event.product!.id) {
        d.quantity = event.quantity;
        d.totalValue = event.totalValue;
        // console.log(d);
        return d;
      } else {
        return d
      }
    });

    this.detailList = updatedDetailLit;



    // refresh total value of bill
    this.calculateTotal();

  }

  calculateTotal() {

    this.billSubTotal = 0;
    // calculate subtotal
    for (let i = 0; this.detailList.length > i; i++) {
      //console.log(this.detailList[i]);
      this.billSubTotal += this.detailList[i].totalValue!;
    }
    // calculate total value with discount 
    this.billTotal = this.billSubTotal - this.billDiscount.value;
    // print bill information in console
    console.log("Fecha de factura: " + this.billDate.value);
    console.log("subtotal: " + this.billSubTotal);
    console.log("Descuento: " + this.billDiscount.value);
    console.log("total: " + this.billTotal);
    // console.log(this.detailList);
  }

  submitBill() {
    // calculates the value of the bill before submiting the form
    this.calculateTotal();
    // create new instance of billEntity 
    const billData = new BillEntity();
    // checke if date has been set 
    if (this.billDate.value == '') {
      this.DateIsSet = false;

      console.warn("la fecha no ha sido seleccionada !");
    } else if (this.detailList.length == 0) {
      this.detailsAreEmpty = true;
      console.warn("debe existir por lo menos un producto !");
    } else {
      this.DateIsSet = true;
      // map properties to the bill instance
      billData.subTotal = this.billSubTotal;
      billData.discount = this.billDiscount.value;
      billData.totalValue = this.billTotal;
      billData.client = this.currentClient;
      billData.date = this.billDate.value;
      billData.details = this.detailList;
      // make post request to back-end api
      this.billService.post(this.clientId, billData).subscribe({
        next: (res: any) => {
          console.log(res);
        }, error: (ex: any) => {
          console.log(ex);
        }
      });
    }
  }

  
}

import { Component } from '@angular/core';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  public productList: ProductEntity[] = [];

  constructor(public productService: ProductService) {


    // make request to back-en
    this.productService.getAll().subscribe({

      next: (res: any) => {
        // set the result to the client list
        this.productList = res;
        // log to console
        console.log("this are the client: ");
        console.log(res);
      },// print error message if needed
      error: (error) => {
        console.log("Not posible to get the clients.");
        console.log(error);
      }
    });


  }



}

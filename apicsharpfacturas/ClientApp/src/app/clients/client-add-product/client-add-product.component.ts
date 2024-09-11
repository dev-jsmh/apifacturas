import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-client-add-product',
  templateUrl: './client-add-product.component.html',
  styleUrls: ['./client-add-product.component.css']
})
export class ClientAddProductComponent {



  public clientId = '';
  public currentClient: ClientEntity = new ClientEntity();
// list of products 
  public productList: ProductEntity[] = [];

  // =============== constructor ===============
  // inject dependencies within the constructor 
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private productService: ProductService
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
      error: ( ex  ) => {
        console.log("Error al intentar obtener los datos del cliente");
        console.log(ex);
      }
    });

    // make request for product list 
this.productService.getAll().subscribe({
  next: ( res: any ) => {
    this.productList = res;
    console.log("List of products: ");
    console.log(this.productList);
  },
  error: ( ex ) => {
    console.log("Error when trying to get products from back-end api");
    console.log( ex );
  }
});


  }


}

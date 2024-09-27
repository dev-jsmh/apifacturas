import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  // instantiate a new product
  public currentProduct: ProductEntity = new ProductEntity();
  public productId: string = '';

  // inject dependencies 
  constructor(public productService: ProductService, private route: ActivatedRoute) {

    // get id of product from route
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    })

    // request for the current product to the back-end
    this.productService.getById(this.productId).subscribe({

      next: (res: any) => {
        this.currentProduct = res;
        console.log("The request product data: ");
        console.log(this.currentProduct);
      }, error: (error: any ) => {
        console.log("No se pudo optener el producto especificado: ");
        console.log(error);
      }
    });

  }

}

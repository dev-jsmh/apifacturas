import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  // variable for storing http error
  public httpError = new HttpErrorResponse({});
  // instantiate a new product
  public currentProduct: ProductEntity = new ProductEntity();
  public productId: string = '';
  public isDeleted = false;

  // inject dependencies 
  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    public modalService: ModalService
  ) {
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
      }, error: (error: any) => {
        this.httpError = error;
        if( this.httpError.status === 404 ){
          this.isDeleted = true;
        }
        console.log("Not possible to find the request product! ");
        console.log(error);
      }
    });

  }

  // call the product service and delete the product by its id
  onDelete(productId: number) {
    this.productService.delete(productId.toString()).subscribe({
      next: (res) => {
        // close confirmation modal
        this.modalService.closeModal("confirmProductDeletion");
        // wait 2sg 
        setTimeout(() => {
          // open modal with success message
          this.modalService.openModal("successProductDeletion");
        }, 200);
        // print result on the console
        console.log(res);
      },
      error: (err) => {
        // cath errors an set in the variable
        this.httpError = err;
        // close confirmation modal
        this.modalService.closeModal("confirmProductDeletion");
        setTimeout(() => {
          this.modalService.openModal("errorProductDeletion");
        }, 200);
        // print result on the console
        console.log(err);
      }
    });
  }

}

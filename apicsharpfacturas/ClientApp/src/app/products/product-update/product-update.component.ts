import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Navigation, Route, Router } from '@angular/router';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {

  public HttpError = new HttpErrorResponse({});
  public isUpdateInProccess = false
  updateProductForm: any;

  // product id form route
  public productId = '';
  // current product
  public currentProduct: ProductEntity = new ProductEntity();
  public isLoaded = false;
 

  // inject dependencies 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    public modalService: ModalService
  ) {

    // extract the product id from route
    this.route.params.subscribe({
      next: (params) => {
        this.productId = params['id']
      },
      error: (error) => {
        console.log("El producto con id " + this.productId + " no existe en la base de datos. ");
        console.log(error);

      }
    });
    // request the product from back-end
    this.productService.getById(this.productId).subscribe({

      next: (res: any) => {
        this.currentProduct = res;
        console.log("Producto obtenido correctamente para actualizar: ");
        console.log(this.currentProduct);
      },
      error: (error) => {
        console.log("Error al obtener el producto de la base de datos. ");
        console.log(error);
      }
    });
    // change state of isLoades after 1sg
    setTimeout(() => {
      // create form with client data 
      this.updateProductForm = this.fb.group(
        {
          "name": [this.currentProduct.name, Validators.required],
          "model": [this.currentProduct.model, Validators.required],
          "price": [this.currentProduct.price, Validators.required],
          "stock": [this.currentProduct.stock, Validators.required]
        })
      this.isLoaded = true;
    }, 100);




  }

   /// url to redirect usert to 
   public productDetailUrl = '/products/' + this.productId + '/details';

  // method to handle form 
  onSubmit() {

    this.isUpdateInProccess = true;
    console.log(this.updateProductForm.value);
    // make update request to back-end
    this.productService.update(this.productId, this.updateProductForm.value).subscribe({
      next: (res: any) => {
        this.isUpdateInProccess = false;
        console.log("product update successfully");
        console.log(res);
        // open modal with success message
        this.modalService.closeModal('confirmUpdateProductModal');
        // wait 200msg
        setTimeout(() => {
          this.modalService.openModal('successUpdateProductModal');
        }, 200);

      },
      error: (error) => {
        this.isUpdateInProccess = false;
        console.log("Error when trying to update product information.");
        console.log(error);
        // set error 
        this.HttpError = error;
        // open modal with success message
        this.modalService.closeModal('confirmUpdateProductModal');
        // wait 200msg
        setTimeout(() => {
          this.modalService.openModal('errorUpdateProductModal');
        }, 200);
      }
    });



  }

}

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
  // product id form route
  public productId = '';
  // current product
  public currentProduct: ProductEntity = new ProductEntity();
  public isLoaded = false;
  /// url to redirect usert to 
  public productDetailUrl = '/products/' + this.productId + '/details';
  // create form with client data 
  public updateProductForm: FormGroup = this.fb.group(
    {
      "name": [this.currentProduct.name, Validators.required],
      "model": [this.currentProduct.model, Validators.required],
      "price": [this.currentProduct.price, Validators.required],
      "stock": [this.currentProduct.stock, Validators.required]
    })

  // form data
  public productData = new FormData();

  // inject dependencies 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public productService: ProductService,
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

        // set values from the client to the form
        this.updateProductForm.patchValue({
          "name": this.currentProduct.name,
          "model": this.currentProduct.model,
          "price": this.currentProduct.price,
          "stock": this.currentProduct.stock,
        });

        console.log("Producto obtenido correctamente para actualizar: ");
        console.log(this.currentProduct);
        // chage state of variable
        this.isLoaded = true;
      },
      error: (error) => {
        console.log("Error al obtener el producto de la base de datos. ");
        console.log(error);
      }
    });

  }

  // method to handle form 
  onSubmit() {

    this.isUpdateInProccess = true;
    /// set updated values to formData
    this.productData.append("name", this.updateProductForm.get("name")?.value);
    this.productData.append("model", this.updateProductForm.get("model")?.value);
    this.productData.append("price", this.updateProductForm.get("price")?.value);
    this.productData.append("stock", this.updateProductForm.get("stock")?.value);
    // prin in console values coming from the form
    console.log("Data from the form: ---------")
    console.log(this.updateProductForm.value);

      // console data coming from formData
      console.log(this.productData.get("name"));
      console.log(this.productData.get("model"));
      console.log(this.productData.get("price"));
      console.log(this.productData.get("stock"));
      console.log(this.productData.get("image"));
    // make update request to back-end
    this.productService.update(this.productId, this.productData).subscribe({
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

  handleImageUpload(event: any) {
    const image = event.target.files[0];
    // add image file to formData
    this.productData.append("image", image);
    console.log(this.productData.get("image"));
  }

}

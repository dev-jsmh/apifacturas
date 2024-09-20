import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  // variable that contains http error
  public HttpError = new HttpErrorResponse({});
  /// variable to check if submit action is in process
  public isSubmitInProccess = false;

  public createProductForm: FormGroup;
  // instantiate a new product
  public newProduct: ProductEntity = new ProductEntity();
  // inject dependencies inside the constructor
  constructor(
    private fb: FormBuilder,
    public productService: ProductService,
    public modalService: ModalService,
    public router: Router
  ) {

    // create the form
    this.createProductForm = this.fb.group(
      {
        "name": ['', Validators.required],
        "model": ['', Validators.required],
        "price": ['', Validators.required],
        "stock": ['', Validators.required]
      }
    );
  }


  validateForm() {

  }


  // method to handle the form data 
  onSubmit() {
    this.isSubmitInProccess = true;

    this.newProduct.name = this.createProductForm.get("name")?.value;
    this.newProduct.model = this.createProductForm.get("model")?.value;
    this.newProduct.price = this.createProductForm.get("price")?.value;
    this.newProduct.stock = this.createProductForm.get("stock")?.value;

    console.log("product data: " + this.newProduct);
    console.log("sending product to back-end.......");
    console.log(this.newProduct);


    // call the service 
    this.productService.create(this.newProduct).subscribe({
      next: (res: any) => {
        console.log("El producto se envio al backend ");
        console.log(res);
        // close confirm action modal
        this.modalService.closeModal('confirmSubmitProductModal');

        setTimeout(() => {
          // open succes modal message
          this.modalService.openModal('successCreateProductModal');
        }, 200);
      },

      error: (error: any) => {
        console.log("Error al intentar guardar el producto en el backend");
        console.log(error);
        this.HttpError = error;
         // close confirm action modal
         this.modalService.closeModal('confirmSubmitProductModal');

         setTimeout(() => {
           // open error modal message
           this.modalService.openModal('errorCreateProductModal');
         }, 200);
      }

    })


  }


}

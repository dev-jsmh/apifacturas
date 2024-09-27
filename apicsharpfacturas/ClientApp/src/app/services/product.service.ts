import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// --------- api ---------
import { apiUrl } from '../env';
import { ProductEntity } from '../models/ProductEntity';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // ======================== get all ====================
  getAll() {
    return this.http.get(apiUrl + '/Products');
  }
  // ======================== save product ====================
  create(product: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data;  boundary'
      })
    }

    return this.http.post(apiUrl + "/Products", product  );
  }
  // ======================== get product by id ====================
  getById(id: string) {
    return this.http.get(apiUrl + "/Products/" + id);
  }
  // ======================== delete product ====================
  delete(id: string) {
    return this.http.delete(apiUrl + "/Products/" + id);
  }
  // ======================== delete product ====================
  update(id: string, productMod: any) {
    return this.http.put(apiUrl + "/Products/" + id, productMod);
  }


  // ======================== other methods ====================

  // image url
  generateImageUrl( imagePath: string | undefined ){
    return "https://localhost:7125/api/v1/" + imagePath ;
  }

}

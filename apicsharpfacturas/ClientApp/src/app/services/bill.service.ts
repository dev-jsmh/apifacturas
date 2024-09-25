import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// models
import { ProductEntity } from '../models/ProductEntity';
import { BillDetailEntity } from '../models/BillDetailEntity';
import { apiUrl } from '../env';
import { BillEntity } from '../models/BillEntity';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private http: HttpClient
  ) { }


  // map product to details 
  public mapProductToBillDetailList(productList: ProductEntity[]) {

    // bill details list 
    let DetailList: BillDetailEntity[] = [];

    // map the product list form request to BillDetialEntity array
    productList.map((p) => {

      // 
      let detail: BillDetailEntity = new BillDetailEntity();

      // map properties
      detail.product = p;
      detail.quantity = 0;
      detail.unitValue = p.price;
      detail.totalValue = 0;
      // push the detail to list 
      DetailList.push(detail);
    });

    if (DetailList != null) {

      // return lis of details 
      return DetailList;
    } else {
      return DetailList;
    }

  }

  // ================== http methods ==================

  // ================== create bill ==================
  public post(clientId: string, newBill: BillEntity) {
    return this.http.post(apiUrl + '/clients/' + clientId + '/bills', newBill);
  }

  // ================== get all bill ==================
  public getAll() {
    return this.http.get(apiUrl + '/bills');
  }

  // ================== get all bill ==================
  public getById(billId: string) {
    return this.http.get(apiUrl + "/bills/" + billId);
  }

    // ================== get all bill ==================
    
  // convert date object to formatted string
  formatDate(dateString: string): string {
    // create a new date object form a string 

    let date = new Date(dateString)

    // an array for names of the months
    let monthsInEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthsInSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    // get number of months from date
    let current_month = monthsInSpanish[date.getMonth()];
    // process the date 
    var formateDateString = ([
      current_month,
      date.getDate(),
      date.getFullYear()
    ].join("/")
      + " " +
      [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      ].join(":"))


    // return the formated date to string 
    return formateDateString;
  }

}

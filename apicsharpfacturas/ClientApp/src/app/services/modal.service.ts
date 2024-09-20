import { Injectable } from '@angular/core';

// bootstrap import
import * as bootstrap from 'bootstrap';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private router: Router) { }



  openModal(id: string) {
    var m = document.getElementById(id);
    //  this.modal!.show();
    var modal = new bootstrap.Modal(m!)
    modal.show();
  }
  closeModal(id: string) {

    // get the modal by its Id name
    var m = document.getElementById(id);
    // get an instance of the create modal 
    // and use to .hide() method 
    bootstrap.Modal.getInstance(m!)?.hide();

  }


  closeAndRedirect(id: string, url: string) {
    // close success message modal
    this.closeModal(id);
    // wait 500msg
    setTimeout(() => {
      // redirect user to especified url
      this.router.navigateByUrl(url);
    }, 1000);
  }

}

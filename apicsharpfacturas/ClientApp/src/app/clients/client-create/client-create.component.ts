import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ClientService } from 'src/app/services/client.service';


// bootstrap import

import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {




  public createClientForm: FormGroup;

  // instantiate a new client
  public newClient: ClientEntity = new ClientEntity();

  // inject dependencies 
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router) {

    // create form 
    this.createClientForm = this.fb.group({
      "names": ['', Validators.required],
      "lastnames": ['', Validators.required]
    });

  }

  onSubmit() {
    this.newClient.names = this.createClientForm.get('names')?.value;
    this.newClient.lastnames = this.createClientForm.get('lastnames')?.value;
    this.newClient.bills = [];

    // make request to back-end
    this.clientService.post(this.newClient).subscribe({
      next: (res: any) => {
        console.log("Data of client send successfully to back-end: ");
        console.log(res);
        setTimeout(() => {

          // close modal
          this.closeConfirmModal();
          this.router.navigateByUrl("/clients");
        }, 200);
      },
      error: (error) => {
        console.log("Error when trying to send a new client to back-end: ");
        console.log(error);
      }
    })
  }



  openConfirmModal() {

    var m = document.getElementById('confirmSubmitActionModal');
    //  this.modal!.show();
    var modal = new bootstrap.Modal(m!)
    modal.show();
  }

  closeConfirmModal() {
    var m = document.getElementById('confirmSubmitActionModal');
    bootstrap.Modal.getInstance(m!)?.hide();
  }
}

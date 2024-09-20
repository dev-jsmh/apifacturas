import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ClientService } from 'src/app/services/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {

  /// variable to check if the submition of the form is in process
  submitInProccess = false;
  /// object for http error
  HttpError = new HttpErrorResponse({});
  // form to create new client 
  public createClientForm: FormGroup;

  // instantiate a new client
  public newClient: ClientEntity = new ClientEntity();

  // inject dependencies 
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    public modalService: ModalService,
    private router: Router) {

    // create form 
    this.createClientForm = this.fb.group({
      "names": ['', Validators.required],
      "lastnames": ['', Validators.required]
    });

  }

  onSubmit() {
    // the submit process starts so show the spinner
    this.submitInProccess = true;

    this.newClient.names = this.createClientForm.get('names')?.value;
    this.newClient.lastnames = this.createClientForm.get('lastnames')?.value;
    this.newClient.bills = [];

    // make request to back-end
    this.clientService.post(this.newClient).subscribe({
      next: (res: any) => {
        console.log("Data of client send successfully to back-end: ");
        console.log(res);
        // hide spinner
        this.submitInProccess = false;
        // close confirm modal message
        this.modalService.closeModal("confirmSubmitActionModal");

        // wait 200msg 
        setTimeout(() => {
          // open success modal message 
          this.modalService.openModal('successSubmitModal');
        }, 200);
      },
      error: (err: HttpErrorResponse) => {
        // hide spinner
        this.submitInProccess = false;
        console.log("Error when trying to send a new client to back-end: ");
        console.log(err);
        this.HttpError = err;
        // close manually modal windows
        this.modalService.closeModal("confirmSubmitActionModal");
        // wait 100msg
        setTimeout(() => {
          // open error modal message
          this.modalService.openModal("errorSubmitModal");
        }, 200);

      }
    })
  }

}

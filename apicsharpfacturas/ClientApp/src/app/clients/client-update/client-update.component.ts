import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ClientService } from 'src/app/services/client.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent {


  /// object for http error
  HttpError = new HttpErrorResponse({});
  // id of client
  public clientId = '';
  // instance for the client
  public currentClient: ClientEntity = new ClientEntity();
  // 
  public clientIsLoaded = false;
  // 
  updateInProccess = false;
  // 
  clientDetailUrl = '/clients/' + this.clientId + '/details';

  // form 
  public updateClientForm: FormGroup = this.fb.group(
    {
      "names": ["", Validators.required],
      "lastnames": ["", Validators.required],
      "phone": [""],
      "address": [""],
    });

  // =============== constructor ===============
  // inject dependencies within the constructor 
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    public modalService: ModalService,
    private router: Router,
    private fb: FormBuilder
  ) {

    // extract id from route
    this.route.params.subscribe({
      next: (params) => {
        this.clientId = params['id'];
      },
      error: (ex) => {
        console.log("Error when trying to get the request client from back-end api");
        console.log(ex);
      }
    });

    // make request to back-end
    this.clientService.getById(this.clientId).subscribe({
      next: (res: any) => {
        // set response to the currentClient variable
        this.currentClient = res;

        // =============== form ===============
        /* 
        this.updateClientForm.controls["names"].setValue(this.currentClient.names);
        this.updateClientForm.controls["lastnames"].setValue(this.currentClient.lastnames);
        this.updateClientForm.controls["phone"].setValue(this.currentClient.phone);
        this.updateClientForm.controls["address"].setValue(this.currentClient.address);
*/

        this.updateClientForm.patchValue({
          "names": this.currentClient.names,
          "lastnames": this.currentClient.lastnames,
          "phone": this.currentClient.phone,
          "address": this.currentClient.address

        });


        this.clientIsLoaded = true;

        console.log("Detalles del cliente. ");
        console.log(this.currentClient);
      },
      error: (ex) => {
        console.log("Error al intentar obtener los datos del cliente");
        console.log(ex);
      }
    });
  }



  // =============== method to handle form ===============
  onSubmit() {
    this.updateInProccess = true;
    // set data from the form to the currentClient variable 
    this.currentClient.names = this.updateClientForm.get("names")?.value
    this.currentClient.lastnames = this.updateClientForm.get("lastnames")?.value
    this.currentClient.phone = this.updateClientForm.get("phone")?.value
    this.currentClient.address = this.updateClientForm.get("address")?.value 

    // ===============  make post request ================
    this.clientService.update(this.clientId, this.currentClient).subscribe({
      next: (res: any) => {
        this.updateInProccess = false;
        // set response to the currentClient variable
        console.log("Client has been updated successfully ");
        console.log(res);
        // close confirm update action modal
        this.modalService.closeModal('confirmUpdateClientActionModal');
        // wait 200msg
        setTimeout(() => {
          this.modalService.openModal('successUpdateClientModal');
        }, 200);
      }, // print error message in console
      error: (err: HttpErrorResponse) => {
        this.updateInProccess = false;
        this.HttpError = err;
        console.log("Error when trying to update client data: ");
        console.log(err);
        // close confirm update action modal
        this.modalService.closeModal('confirmUpdateClientActionModal');
        // wait 200msg
        setTimeout(() => {
          this.modalService.openModal('errorUpdateClientModal');
        }, 200);
      }
    });
  }
}

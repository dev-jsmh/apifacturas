import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent {

  // id of client
  public clientId = '';
  // instance for the client
  public currentClient: ClientEntity = new ClientEntity();
  // form 
  public updateClientForm: any;
  // 
  public clientIsLoaded = false;

  // =============== constructor ===============
  // inject dependencies within the constructor 
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
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

        console.log("Detalles del cliente. ");
        console.log(this.currentClient);
      },
      error: (ex) => {
        console.log("Error al intentar obtener los datos del cliente");
        console.log(ex);
      }
    });

    // set data to form after 1sg
    setTimeout(() => {
      // =============== form ===============
      this.updateClientForm = this.fb.group({
        "names": [this.currentClient.names, Validators.required],
        "lastnames": [this.currentClient.lastnames, Validators.required],
      });

      this.clientIsLoaded = true;
    }, 100);

  }

  // =============== method to handle form ===============
  onSubmit() {
    // set data from the form to the currentClient variable 
    this.currentClient.names = this.updateClientForm.get('names')?.value;
    this.currentClient.lastnames = this.updateClientForm.get('lastnames')?.value;
    // ===============  make post request ================
    this.clientService.update(this.clientId, this.currentClient).subscribe({
      next: (res: any) => {
        // set response to the currentClient variable
        console.log("Client has been updated successfully ");
        console.log(res);
        this.router.navigateByUrl("/clients/" + this.clientId + '/details')
      }, // print error message in console
      error: (ex) => {
        console.log("Error when trying to update client data: ");
        console.log(ex);
      }
    });
  }
}

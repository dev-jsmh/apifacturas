import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ClientService } from 'src/app/services/client.service';

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

    // make request to back-end
    this.clientService.post(this.newClient).subscribe({
      next: (res: any) => {
        console.log("Data of client send successfully to back-end: ");
        console.log(res);
        setTimeout( () => {
          this.router.navigateByUrl("/clients");
        }, 500);
      }, 
      error: ( error ) => {
        console.log("Error when trying to send a new client to back-end: ");
        console.log(error);
      }
    })
  }

}

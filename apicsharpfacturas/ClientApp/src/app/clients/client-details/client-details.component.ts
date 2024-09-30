import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import DataTable from 'datatables.net-dt';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {


  public clientId = '';

  public currentClient: ClientEntity = new ClientEntity();

  // create a variable for use as the Datatable()
  public table: any;

  // =============== constructor ===============
  // inject dependencies within the constructor 
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
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
        console.log("detalles del cliente. ");
        console.log(this.currentClient);
        // wati nodejs.timeout
        setTimeout(() => {
          // initialize table
          this.table = new DataTable("#clientDetailTable");
        } );
      },
      error: (ex) => {
        console.log("Error al intentar obtener los datos del cliente");
        console.log(ex);
      }
    });
  }
}

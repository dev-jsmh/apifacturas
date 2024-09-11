import { Component } from '@angular/core';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent {

  // list of clients 
  public clients: ClientEntity[] = [];

  constructor(private clientService: ClientService) {

    // make get request to back-end
    this.clientService.getAll().subscribe({
      next: (res: any) => {
        this.clients = res;
        console.log("This are the clients: ");
        console.log(this.clients);
      }, error: (error) => {
        console.log("Error when trying to get the clients from back-end");
        console.log(error);
      }
    });

  }



}

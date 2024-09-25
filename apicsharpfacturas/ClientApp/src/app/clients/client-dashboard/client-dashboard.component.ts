import { Component, OnInit } from '@angular/core';
import { ClientEntity } from 'src/app/models/ClientEntity';
import { ClientService } from 'src/app/services/client.service';
// ======================== import datatable ========================
import DataTable from 'datatables.net-dt';


@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  // list of clients 
  public clients: ClientEntity[] = [];
  // table variable
  public table: any;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    // make get request to back-end
    this.clientService.getAll().subscribe({
      next: (res: any) => {
        this.clients = res;
        console.log("This are the clients: ");
        console.log(this.clients);
        // wati nodejs.timeout
        setTimeout(() => {
          // initialize datatable
          this.table = new DataTable("#clientDashboardTable");
        } );
      }, error: (error) => {
        console.log("Error when trying to get the clients from back-end");
        console.log(error);
      }
    });
  }


}

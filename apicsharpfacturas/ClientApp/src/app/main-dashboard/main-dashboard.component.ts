import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent {
  
constructor( private router: Router ){}

  public loggout(){
    // remove data from local storage
    localStorage.removeItem("name");
    localStorage.removeItem("password");
    // navigate to loggin page
    this.router.navigateByUrl("/");
  }

}

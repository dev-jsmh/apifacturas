import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

// =========== billing components ===========
import { BillingDashboardComponent } from './billing/billing-dashboard/billing-dashboard.component';
import { BillCreateComponent } from './billing/bill-create/bill-create.component';
import { BillDetailsComponent } from './billing/bill-details/bill-details.component';
import { BillUpdateComponent } from './billing/bill-update/bill-update.component';
import { AddReduceDetailQuantityComponent } from './billing/add-reduce-detail-quantity/add-reduce-detail-quantity.component';

// =========== products components ===========
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';

// =========== clients components ===========
import { ClientDashboardComponent } from './clients/client-dashboard/client-dashboard.component';
import { ClientCreateComponent } from './clients/client-create/client-create.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientUpdateComponent } from './clients/client-update/client-update.component';
import { ClientAddProductComponent } from './clients/client-add-product/client-add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FetchDataComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ClientUpdateComponent,
    ClientDetailsComponent,
    ClientCreateComponent,
    ClientDashboardComponent,
    ClientAddProductComponent,
    BillingDashboardComponent,
    BillCreateComponent,
    BillDetailsComponent,
    AddReduceDetailQuantityComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'billing-dashboard',
        children: [
          { path: '', component: BillingDashboardComponent },
          { path: 'create', component: BillCreateComponent },
          { path: ':id/details', component: BillDetailsComponent },
          { path: ':id/update', component: BillUpdateComponent }
        ]
      },
      {
        path: 'products',
        children: [
          { path: '', component: ProductListComponent },
          { path: 'create', component: ProductCreateComponent },
          { path: ':id/details', component: ProductDetailsComponent },
          { path: ':id/update', component: ProductUpdateComponent },

        ]
      },
      {
        path: 'clients',
        children: [
          { path: '', component: ClientDashboardComponent },
          { path: 'create', component: ClientCreateComponent },
          { path: ':id/details', component: ClientDetailsComponent },
          { path: ':id/update', component: ClientUpdateComponent },
          { path: ':id/add-product', component: ClientAddProductComponent },
          { path: ':id/create-new-bill', component: BillCreateComponent }
      
        ]
      },
      { path: 'fetch-data', component: FetchDataComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


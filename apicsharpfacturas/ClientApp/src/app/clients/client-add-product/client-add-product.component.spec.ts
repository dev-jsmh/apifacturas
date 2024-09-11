import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddProductComponent } from './client-add-product.component';

describe('ClientAddProductComponent', () => {
  let component: ClientAddProductComponent;
  let fixture: ComponentFixture<ClientAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAddProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

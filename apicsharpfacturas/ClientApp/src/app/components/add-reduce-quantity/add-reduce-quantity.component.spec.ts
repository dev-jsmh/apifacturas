import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReduceQuantityComponent } from './add-reduce-quantity.component';

describe('AddReduceQuantityComponent', () => {
  let component: AddReduceQuantityComponent;
  let fixture: ComponentFixture<AddReduceQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReduceQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReduceQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

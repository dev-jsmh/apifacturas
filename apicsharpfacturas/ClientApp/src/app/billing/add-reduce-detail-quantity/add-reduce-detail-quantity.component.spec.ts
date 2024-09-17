import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReduceDetailQuantityComponent } from './add-reduce-detail-quantity.component';

describe('AddReduceDetailQuantityComponent', () => {
  let component: AddReduceDetailQuantityComponent;
  let fixture: ComponentFixture<AddReduceDetailQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReduceDetailQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReduceDetailQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

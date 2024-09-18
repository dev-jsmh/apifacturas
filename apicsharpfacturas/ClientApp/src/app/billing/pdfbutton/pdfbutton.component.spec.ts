import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfbuttonComponent } from './pdfbutton.component';

describe('PdfbuttonComponent', () => {
  let component: PdfbuttonComponent;
  let fixture: ComponentFixture<PdfbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfbuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

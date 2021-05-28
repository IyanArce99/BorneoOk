import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOwnedComponent } from './contact-owned.component';

describe('ContactOwnedComponent', () => {
  let component: ContactOwnedComponent;
  let fixture: ComponentFixture<ContactOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactOwnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

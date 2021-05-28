import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPropiedadesComponent } from './administrar-propiedades.component';

describe('AdministrarPropiedadesComponent', () => {
  let component: AdministrarPropiedadesComponent;
  let fixture: ComponentFixture<AdministrarPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarPropiedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

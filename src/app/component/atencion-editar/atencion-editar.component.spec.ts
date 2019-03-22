import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionEditarComponent } from './atencion-editar.component';

describe('AtencionEditarComponent', () => {
  let component: AtencionEditarComponent;
  let fixture: ComponentFixture<AtencionEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

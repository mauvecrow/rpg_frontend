import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesetCrudComponent } from './moveset-crud.component';

describe('MovesetCrudComponent', () => {
  let component: MovesetCrudComponent;
  let fixture: ComponentFixture<MovesetCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovesetCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovesetCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

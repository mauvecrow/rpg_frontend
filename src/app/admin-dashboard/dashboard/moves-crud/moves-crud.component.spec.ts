import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesCrudComponent } from './moves-crud.component';

describe('MovesCrudComponent', () => {
  let component: MovesCrudComponent;
  let fixture: ComponentFixture<MovesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

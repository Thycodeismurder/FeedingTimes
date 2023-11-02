import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFormViewComponent } from './action-form-view.component';

describe('ActionFormViewComponent', () => {
  let component: ActionFormViewComponent;
  let fixture: ComponentFixture<ActionFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionFormViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

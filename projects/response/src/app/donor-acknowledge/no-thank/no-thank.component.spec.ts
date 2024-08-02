import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoThankComponent } from './no-thank.component';

describe('NoThankComponent', () => {
  let component: NoThankComponent;
  let fixture: ComponentFixture<NoThankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoThankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoThankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesThankComponent } from './yes-thank.component';

describe('YesThankComponent', () => {
  let component: YesThankComponent;
  let fixture: ComponentFixture<YesThankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YesThankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesThankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

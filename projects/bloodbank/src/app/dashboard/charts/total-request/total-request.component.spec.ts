import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRequestComponent } from './total-request.component';

describe('TotalRequestComponent', () => {
  let component: TotalRequestComponent;
  let fixture: ComponentFixture<TotalRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

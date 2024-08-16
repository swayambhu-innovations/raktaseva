import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRejectedComponent } from './request-rejected.component';

describe('RequestRejectedComponent', () => {
  let component: RequestRejectedComponent;
  let fixture: ComponentFixture<RequestRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

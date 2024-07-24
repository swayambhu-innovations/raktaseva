import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbsidebarComponent } from './bbsidebar.component';

describe('BbsidebarComponent', () => {
  let component: BbsidebarComponent;
  let fixture: ComponentFixture<BbsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BbsidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

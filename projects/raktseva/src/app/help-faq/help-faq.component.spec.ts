import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFaqComponent } from './help-faq.component';

describe('HelpFaqComponent', () => {
  let component: HelpFaqComponent;
  let fixture: ComponentFixture<HelpFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpFaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

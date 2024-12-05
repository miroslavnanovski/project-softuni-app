import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedThemesComponent } from './subscribed-themes.component';

describe('SubscribedThemesComponent', () => {
  let component: SubscribedThemesComponent;
  let fixture: ComponentFixture<SubscribedThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribedThemesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribedThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyThemePageComponent } from './empty-theme-page.component';

describe('EmptyThemePageComponent', () => {
  let component: EmptyThemePageComponent;
  let fixture: ComponentFixture<EmptyThemePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyThemePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyThemePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesPageComponent } from './themes-page.component';

describe('ThemesPageComponent', () => {
  let component: ThemesPageComponent;
  let fixture: ComponentFixture<ThemesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

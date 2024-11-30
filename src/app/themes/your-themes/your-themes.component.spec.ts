import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourThemesComponent } from './your-themes.component';

describe('YourThemesComponent', () => {
  let component: YourThemesComponent;
  let fixture: ComponentFixture<YourThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourThemesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

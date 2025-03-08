import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NokoComponent } from './noko.component';

describe('NokoComponent', () => {
  let component: NokoComponent;
  let fixture: ComponentFixture<NokoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NokoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NokoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

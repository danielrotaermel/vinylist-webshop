import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOverlayComponent } from './card-overlay.component';

describe('CardOverlayComponent', () => {
  let component: CardOverlayComponent;
  let fixture: ComponentFixture<CardOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

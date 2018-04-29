import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from '../test-helper/mock.component';
import { NavigationBarComponent } from './navigation-bar.component';



describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NavigationBarComponent,
        MockComponent({ selector: 'app-language-switcher' })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
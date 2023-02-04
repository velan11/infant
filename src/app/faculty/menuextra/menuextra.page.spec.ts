import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';
import { IonicModule } from '@ionic/angular';

import { MenuextraPage } from './menuextra.page';

describe('MenuextraPage', () => {
  let component: MenuextraPage;
  let fixture: ComponentFixture<MenuextraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuextraPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        Firebase
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuextraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

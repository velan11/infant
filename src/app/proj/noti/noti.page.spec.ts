import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NotiPage } from './noti.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';

describe('NotiPage', () => {
  let component: NotiPage;
  let fixture: ComponentFixture<NotiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        Firebase
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

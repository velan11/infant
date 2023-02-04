import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';
import { IonicModule } from '@ionic/angular';

import { OtpcheckPage } from './otpcheck.page';

describe('OtpcheckPage', () => {
  let component: OtpcheckPage;
  let fixture: ComponentFixture<OtpcheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpcheckPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        Firebase
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpcheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

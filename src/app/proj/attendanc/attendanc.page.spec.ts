import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';
import { IonicModule } from '@ionic/angular';

import { AttendancPage } from './attendanc.page';

describe('AttendancPage', () => {
  let component: AttendancPage;
  let fixture: ComponentFixture<AttendancPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        Firebase,
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AttendancPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

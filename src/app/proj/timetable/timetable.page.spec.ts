import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';
import { IonicModule } from '@ionic/angular';

import { TimetablePage } from './timetable.page';

describe('TimetablePage', () => {
  let component: TimetablePage;
  let fixture: ComponentFixture<TimetablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetablePage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        Firebase
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimetablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

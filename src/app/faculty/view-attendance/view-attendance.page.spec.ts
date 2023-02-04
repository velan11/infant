import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAttendancePage } from './view-attendance.page';

describe('ViewAttendancePage', () => {
  let component: ViewAttendancePage;
  let fixture: ComponentFixture<ViewAttendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAttendancePage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

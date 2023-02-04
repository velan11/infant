import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AttendanceStatementPage } from './attendance-statement.page';

describe('AttendanceStatementPage', () => {
  let component: AttendanceStatementPage;
  let fixture: ComponentFixture<AttendanceStatementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceStatementPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceStatementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

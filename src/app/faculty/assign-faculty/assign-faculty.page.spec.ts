import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignFacultyPage } from './assign-faculty.page';

describe('AssignFacultyPage', () => {
  let component: AssignFacultyPage;
  let fixture: ComponentFixture<AssignFacultyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFacultyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignFacultyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

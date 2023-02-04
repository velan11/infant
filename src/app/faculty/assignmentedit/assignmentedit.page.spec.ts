import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignmenteditPage } from './assignmentedit.page';

describe('AssignmenteditPage', () => {
  let component: AssignmenteditPage;
  let fixture: ComponentFixture<AssignmenteditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmenteditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmenteditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

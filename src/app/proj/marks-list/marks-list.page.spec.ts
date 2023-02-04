import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarksListPage } from './marks-list.page';

describe('MarksListPage', () => {
  let component: MarksListPage;
  let fixture: ComponentFixture<MarksListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarksListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

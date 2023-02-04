import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NotiViewPage } from './noti-view.page';

describe('NotiViewPage', () => {
  let component: NotiViewPage;
  let fixture: ComponentFixture<NotiViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiViewPage ],
      imports: [IonicModule.forRoot()],
      providers: [ 
        {
          provide: ActivatedRoute,
          useValue: {
              snapshot: {
                  paramMap: {
                      get(): string {
                          return '123';
                      },
                  },
              },
          },
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotiViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

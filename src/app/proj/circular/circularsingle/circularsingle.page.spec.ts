import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { IonicModule } from '@ionic/angular';

import { CircularsinglePage } from './circularsingle.page';

describe('CircularsinglePage', () => {
  let component: CircularsinglePage;
  let fixture: ComponentFixture<CircularsinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularsinglePage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        
      ],
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
        },
        PreviewAnyFile,
        Firebase
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CircularsinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

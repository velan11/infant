import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';
import { IonicModule } from '@ionic/angular';

import { OpemPage } from './opem.page';

describe('OpemPage', () => {
  let component: OpemPage;
  let fixture: ComponentFixture<OpemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpemPage ],
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        Firebase
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OpemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

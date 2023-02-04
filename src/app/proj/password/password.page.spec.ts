import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';
import { IonicModule } from '@ionic/angular';

import { PasswordPage } from './password.page';

describe('PasswordPage', () => {
  let component: PasswordPage;
  let fixture: ComponentFixture<PasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordPage ],
      imports: [IonicModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers:[
      Firebase
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

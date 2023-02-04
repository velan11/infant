import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularDelegate, PopoverController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { GeneralService } from './general.service';

describe('GeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule,
      HttpClientTestingModule,
      IonicStorageModule.forRoot()
    ],
    providers: [
      Firebase,
      PopoverController,
      AngularDelegate
    ]
  }));

  it('should be created', () => {
    const service: GeneralService = TestBed.get(GeneralService);
    expect(service).toBeTruthy();
  });
});

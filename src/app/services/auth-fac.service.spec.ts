import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthFacService } from './auth-fac.service';

describe('AuthFacService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: AuthFacService = TestBed.get(AuthFacService);
    expect(service).toBeTruthy();
  });
});

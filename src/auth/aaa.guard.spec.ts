import { TestBed, async, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AaaGuard } from "../auth/aaa.guard";

describe("AaaGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AaaGuard]
    });
  });

  it("should ...", inject([AaaGuard], (guard: AaaGuard) => {
    expect(guard).toBeTruthy();
  }));
});

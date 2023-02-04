import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch, GeneralService } from "src/app/services/general.service";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-password",
  templateUrl: "./password.page.html",
  styleUrls: ["./password.page.scss"]
})
export class PasswordPage implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  mob: any;
  err: any;
  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router,
    public generalts: GeneralService,
    public actroute: ActivatedRoute
  ) {
    this.mob = this.actroute.snapshot.paramMap.get("mob_num");
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      console.log(this.registerForm.value.confirmPassword, "reg");
      var pas = {
        password: this.registerForm.value.password,
        //mobile: this.mob,
        password_confirm: this.registerForm.value.confirmPassword
      };
      var token = localStorage.getItem("pas_tok");
      const load = await this.generalts.loading("Loading ...");
      await load.present();
      this.auth.g_postt(pas, "change-password", token).subscribe(
        sa => {
          console.log(sa, "da");
          if (sa.message) {
            load.dismiss();
            //  alert("password");
            this.generalts.showToast(sa.message);
            localStorage.setItem("*/", this.mob);
            this.router.navigate(["/home"]);
            //localStorage.setItem("asd", this.mob);
          }
          // else if (sa.status != true) {
          //   this.err = sa.status;
          // }
        },
        error => {
          load.dismiss();
          console.error("Error!", error.status_code, error.message);
          if (error.status_code == 400) {
            this.err = error.message;
          }
        }
      );
    }

    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
  }
}

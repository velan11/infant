import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  mob_num: any = "";
  page: any;
  error: any;
  name: any = "asdfasd";
  constructor(
    public router: Router,
    private activatedrouted: ActivatedRoute,
    public auth: AuthService,
    public generalts: GeneralService
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.page = this.activatedrouted.snapshot.paramMap.get("p");
    console.log("SignupPage", this.page);
  }
  async for_otp() {
    console.log(this.page, "pag");

    this.error = "";

    console.log(this.mob_num, "this.mob_num.toString().length");
    if ([null, "", undefined].indexOf(this.mob_num) > -1) {
      return (this.error = "Please enter valid Credentials");
    } else if (this.mob_num.toString().length < 4) {
      return (this.error = "Please enter valid Credentials");
    } else if (this.mob_num.toString().length > 4) {
      const load = await this.generalts.loading("Loading ...");
      await load.present();
      var mob = { username: this.mob_num, type: this.page };

      this.auth.postt(mob, this.page).subscribe(
        sa => {
          load.dismiss();
          console.log(sa, "asd");
          if (sa) {
            this.router.navigate([
              "/otpcheck",
              { mob_num: this.mob_num, otp: sa.otp, fnct: this.page }
            ]);
          } else if (sa.status_code == 400) {
            console.error("sa!", sa.status_code, sa);
            this.error = sa.message;
          }
        },
        error => {
          load.dismiss();
          console.error("Error!", error.status_code, error.message);
          if (error.status_code == 400) {
            this.error = error.message;
          }
        }
        // (err: any) => {
        //   console.log("asdf1111", err);
        //   if (err.status == 400) {
        //     console.log("asdf1111", err);
        //     this.error = true;
        //     // this.LoginError =
        //     //   "Invalid Credentials. Please enter valid details ";
        //   }
        // }
      );
    }
  }

  // reg_otp() {
  //   this.error = "";
  //   console.log(this.mob_num, "this.mob_num.toString().length");
  //   if ([null, "", undefined].indexOf(this.mob_num) > -1) {
  //     return (this.error = "*Enter 10 digit Mobile n.o");
  //   }else if (this.mob_num.toString().length != 10) {
  //     return (this.error = "*Enter 10 digit Mobile n.o");
  //   } else if (this.mob_num.toString().length == 10) {
  //     var mob = { phone: this.mob_num, name: this.name };
  //     this.auth.postt(mob, "sendotp/reg").subscribe(sa => {
  //       console.log(sa, "asd");
  //       if (sa.status == false) {
  //         this.error = sa.message;
  //       } else if (sa.status == true) {
  //         this.router.navigate(["/otpcheck", { mob_num: this.mob_num }]);
  //       }
  //     });
  //   }
  // }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-otpcheck",
  templateUrl: "./otpcheck.page.html",
  styleUrls: ["./otpcheck.page.scss"]
})
export class OtpcheckPage implements OnInit {
  otp: any;
  mob_num: any;
  otps: any;
  error: any;
  fuct: any;
  constructor(
    public auth: AuthService,
    public activatedroute: ActivatedRoute,
    public router: Router,
    public generalts: GeneralService
  ) {
    this.mob_num = this.activatedroute.snapshot.paramMap.get("mob_num");
    this.otps = this.activatedroute.snapshot.paramMap.get("otp");
    this.fuct = this.activatedroute.snapshot.paramMap.get("fnct");
    console.log(this.mob_num, "sa");
  }
  ionViewDidView() {
    this.error = "";
  }

  bakk() {
    window.history.back();
  }

  ngOnInit() {}
  async otp_verify() {
    console.log(this.fuct, "fuct");
    this.error = "";
    var verify_otp = {
      otp: this.otp,
      username: this.mob_num,
      type: this.fuct
    };
    console.log(verify_otp, "verify_otp");

    if ([null, "", undefined].indexOf(this.otp) > -1) {
      this.error = "Enter  OTP";
    } else if (this.otp.toString().length != 5) {
      this.error = "Enter OTP";
    } else if (
      [null, "", undefined].indexOf(this.otp) < -1 ||
      this.otp.toString().length == 5
    ) {
      const load = await this.generalts.loading("Loading ...");
      await load.present();
      this.auth.postt(verify_otp, "verify-otp-get-token").subscribe(
        response => {
          load.dismiss();
          console.log(response, "response");
          if (response.token) {
            localStorage.setItem("pas_tok", response.token);
            this.router.navigate(["/password", { mob_num: this.mob_num }]);
          }
        },
        error => {
          load.dismiss();
          console.error("Error!", error.status_code, error.message);
          if (error.status_code == 400) {
            this.error = error.message;
          }
        }
      );
    }
  }
}

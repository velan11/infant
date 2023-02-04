import { Component, OnInit } from "@angular/core";
import { AlertController, MenuController, NavController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { GeneralService } from "src/app/services/general.service";
import { PaymentService } from "../../services/payment.service";
import { locale } from "moment";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user: any = "";
  password: any = "";
  show: boolean = false;
  Institution: any = [];
  error: any; page: any;
  constructor(
    public menu: MenuController,
    public router: Router,
    private auth: AuthService,
    public generalts: GeneralService,
    public navCtrl: NavController,
    public activatedrouted: ActivatedRoute, 
    public alertController: AlertController,
    private payService: PaymentService
  ) { }

  ionViewWillEnter() {
    console.log("ionViewWillEnter")

    this.page = this.activatedrouted.snapshot.paramMap.get("page");

    if (['', null, undefined].indexOf(this.page) > -1) {

      this.page = 'login_parents';
      // this.page = 'login_staff';
    }
    // this.getInstitute()
    //this.page="login_parents";
    console.log(this.page, "page");
    this.menu.enable(false);
    this.menu.swipeGesture(false);
    this.menu.close();
    this.error = "";

  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave")

  }
  ionViewDidLeave() {
    console.log("ionViewDidLeave")

  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter")
  }



  async login() {
    this.error = "";

    console.log(this.user, this.password, "login()");
    var data = { username: this.user, password: this.password };
    if (
      [null, "", undefined].indexOf(this.user) > -1 ||
      [null, "", undefined].indexOf(this.password) > -1
    ) {
      this.error = "Please enter Login credentials";
    } else {
      const load = await this.generalts.loading("Loading ...");
      await load.present();
      var faculty = undefined;
      if (this.page == "login_staff") {
        console.log(this.page, "page")
        faculty = "base_path_faculty";
      } else if (this.page == "login_parents") {
        console.log(this.page, "page");
        faculty = undefined;
      }
      this.auth.postt(data, "login", faculty).subscribe(
        response => {
          console.log(response, "response111", response.token);
          
          if (response.token) {
            load.dismiss();
            localStorage.setItem("pas_tok", response.token);
            localStorage.setItem("*/", this.user);
            //this.eregister(response, this.password)
            this.menu.enable(true);
            this.menu.swipeGesture(true);
            // location.reload();
            this.navCtrl.navigateRoot("/home");
          }
          else if (response.access_token) {
            load.dismiss();
            console.log(response, "response111 access_token", response.access_token);
            this.menu.enable(true);
            this.menu.swipeGesture(true);
            localStorage.setItem("pas_faculty", response.access_token);
            // location.reload();
            this.navCtrl.navigateRoot("/dashboard");
            console.log(response.access_token, "access_token_faculty");
          }
          
        },
        error => {
          load.dismiss();
          console.error("Error!", error, "status_code", error.status_code);
          if (error.status_code == 400) {
            this.error = error.message;
            console.error("Error!", error.status_code, error.message);
          }
          if (error.message == 'Login Failed') {
            this.error = 'User Not Found';
          }
          // else if (error.status == 401) {
          //   this.error = "Invalid Credentials. Please Enter valid Details";
          //   //error.statusText
          //   console.error("Error!", error.status_code, error.message);
          // }
        }
      );
    }
  }

  signup() {
    this.router.navigate(["/signup", { p: "register" }]);
  }

  pass() {
    this.show = !this.show;
  }

  forgot() {
    this.router.navigate(["/signup", { p: "forgot-password" }]);
    console.log("dsfad");
  }
  ngOnInit() { 
    this.login_check();
  }

  back() {
    this.router.navigate(['opem'])
  }

  eregister(resp, password) {
    
    let parentLogin = resp.parentLogin;
    let parentDetails = resp.parentDetails;
    let token = resp.token

    if(parentLogin.ewallet_access_status === 0) {
      //eWallet Registration
      let data = {
        names : parentDetails.name,
        contact: parentDetails.mobile,
        email: parentDetails.email,
        password: password
      };

      console.log(data, 'as');
      let access_status = {
        id: parentLogin.id,
        ewallet_access_status: 1,
        username: parentDetails.mobile
      }

      console.log(access_status);
      this.payService.switch_to_ewallet_api('register-to-ewallet', data)
          .subscribe(resp => {
            console.log(resp);
            if(!resp.error) {
              //parent eWallet access status Updated
              let faculty = undefined;
              let access_status = {
                id: parentLogin.id,
                ewallet_access_status: 1,
                username: parentDetails.mobile
              }
              this.auth.g_postt(access_status, "ewallet-access-status", token)
                  .subscribe(resps => {
                    console.log(resps)
                    if(resps.message === 'Ewallet Access Status Updated'){
                      this.elogin(parentDetails.mobile, password)
                    }
                  });
            }
          })
      }else {
        this.elogin(parentDetails.mobile, password);
      }

   
  }

  elogin(mobile, password) {
     //eWallet Login 
     let login_data = { contact:mobile,
      password: password,
    };
    this.payService.switch_to_ewallet_api('switch-to-payment', login_data)
    .subscribe(r => {
    console.log(r, 'sfsd');
    localStorage.setItem("e_token", r.token);
    localStorage.setItem("e_user", JSON.stringify(r.user));
    })
  }

  async login_check() {
    let pass_faculty = localStorage.getItem('pas_faculty');
    let pass_parent = localStorage.getItem('pas_tok');
    const load = await this.generalts.loading("Loading ...");
    await load.present();
    if(pass_faculty) {
      this.menu.enable(true);
      this.menu.swipeGesture(true);
      localStorage.setItem("pas_faculty", pass_faculty);
      load.dismiss();
      this.navCtrl.navigateRoot("/dashboard");
    }
    if(pass_parent) {
      localStorage.setItem("pas_tok", pass_parent);
      this.menu.enable(true);
      this.menu.swipeGesture(true);
      load.dismiss();
      this.navCtrl.navigateRoot("/home");
    }
    load.dismiss();
  }
}

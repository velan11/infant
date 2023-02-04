import { Component, EventEmitter, Output } from "@angular/core";
import {
  PopoverController,
  MenuController,
  AlertController

} from "@ionic/angular";
import { PopComponent } from "../pop/pop.component";
import { GeneralService } from "src/app/services/general.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Firebase } from "@ionic-native/firebase/ngx";


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  segs = "Regular";
  add: boolean = false;
  err: any;
  token: any;
  student_l: any;
  go_prof: boolean;
  c_stud: any;
  sms_count: any;
  submenu: boolean = false;
  Institution = [];

  @Output() newItemEvent = new EventEmitter();

  constructor(
    public popoverController: PopoverController,
    public menu: MenuController,
    public generalts: GeneralService,
    public auth: AuthService,
    public router: Router,
    public alertController: AlertController,
    private firebaseX: Firebase
  ) { }
  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_tok");
    this.c_stud = localStorage.getItem("c_stud");
    this.firebase_token(this.c_stud);
    console.log(
      "ionViewWillEnter",
      ["", null, undefined].indexOf(this.c_stud) > -1,
      this.c_stud
    );
    // this.get_sms_c(this.c_stud);
    if (["", null, undefined].indexOf(this.c_stud) > -1) {
      this.get_stud();
      
      // this.menu.enable(true);
      // this.menu.swipeGesture(true);
      //this.menu.open('first');
      var prr = localStorage.getItem("profile");
      console.log(prr, 'fghh');
      setTimeout(() => {
        if (["", null, undefined].indexOf(prr) > -1) {
          console.log('fffashok')
          this.stud();
        }
      }, 2000);
    }


    // this.get_sms_c();
  }
  menuIs() {
    this.newItemEvent.emit('item1');
  }
  get_sms_c(st_id) {
    // return
    var data = "";
    if (st_id) {


      this.auth
        .g_get(
          data,
          "student/" + st_id + "/notifications/count/unread",
          this.token
        )
        .subscribe(smscount => {
          this.sms_count = smscount.count;
          console.log(smscount.count, "smscount");
        },
          error => {
            // load.dismiss();
            console.error("Error!", error.status_code, error.message);
            if(error.status == 401 ) {
              this.auth.loginAgain();
              //this.router.navigateByUrl('/login');
            }else if (error.status_code == 400) {
              this.err = error.message;
            }
            else if (error.status === 401 || error.status === 422) {
              // this.error = true;
              // this.loginError = "Invalid Credentials. Please Enter valid Details ";
              console.log("error log list: ", error);
              console.log("error log list: ", error.statusText);
              console.log("error log list: ", error.message);
              //  localStorage.clear();
              // this.generalts.loginAgain();  
              // this.hide = true; 
              // this.location.back();

              this.router.navigateByUrl('/opem');
            }

          })
    }
    // console.log("fasd");
  }
  ionViewDidEnter() {
    this.get_sms_c(this.c_stud);

    this.menu.enable(true);
    this.menu.swipeGesture(true);
    console.log("ionViewDidEnter fg");
  }
  rout(val) {
    console.log(val, "val");
    this.router.navigate([val]);
  }
  async stud() {
    let inputArray = [];
    this.c_stud = localStorage.getItem("c_stud");
    var ss = JSON.parse(localStorage.getItem("stu"));
console.log(localStorage.getItem("stu"), 'As111');
    if (ss) {
      console.log(this.student_l, "ASd", ss);

      for (let name of ss) {
        // console.log(name, "nameloop", name.student_id.toString(), this.c_stud);

        if (name.student_id == this.c_stud) {
          console.log(name.student_id, "name.student_id");
          inputArray.push({
            type: "radio",
            label: name.student_name,
            value: name.student_id,
            checked: true
          });
        } else {
          inputArray.push({
            type: "radio",
            label: name.student_name,
            value: name.student_id,
            checked: false
          });
        }
      }
      console.log(inputArray, "inputArray");
      const alert = await this.alertController.create({
        header: "Select Student",
        backdropDismiss: false,
        buttons: [

          {
            text: "OK",
            handler: data => {
              console.log("out", data);
              localStorage.setItem("c_stud", data);
              this.get_prof();
              this.get_sms_c(data);
            }
          }
        ],
        inputs: inputArray
      });
      alert.present();
    }
  }

  firebase_token(data) {
    console.log("firebase_token", data);
    // "update-mobile-notification-token";
    this.firebaseX
      .getToken()
      .then(g_token => {
        console.log(`The token is ${g_token}`);
        if (g_token) {
          var data_token = { token: g_token };

          this.auth
            .g_postt(data_token, "update-mobile-notification-token", this.token)
            .subscribe(response => {
              console.log(response, "token");
            });
        } else {
          setTimeout(() => {
            this.firebaseX.onTokenRefresh().subscribe((g_token: string) => {
              console.log(`Got a new token ${g_token}`);
              var data_token = { token: g_token };

              this.auth
                .g_postt(
                  data_token,
                  "update-mobile-notification-token",
                  this.token
                )
                .subscribe(response => {
                  console.log(response, "token");
                });
            });
          }, 1500);
        }
      }) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error("Error getting token", error));

    // this.firebaseX
    //   .onMessageReceived()
    //   .subscribe(data => console.log(`User opened a notification ${data}`));

    this.firebaseX.onNotificationOpen().subscribe(data => console.log(data));
  }

  async get_prof() {
    const load = await this.generalts.loading("Loading ...");
    await load.present();

    var data = "";
    var link = "student/" + this.c_stud + "/profile";
    console.log(link, "link", "this.c_stud ", this.c_stud);
    this.auth.g_get(data, link, this.token)
      .subscribe(
        prof => {
          load.dismiss();
          localStorage.setItem("profile", JSON.stringify(prof));
          console.log(prof, "prof");
        },
        error => {
          load.dismiss();
          console.error("Error!", error.status_code, error.message);
          if (error.status_code == 400) {
            this.err = error.message;
          }
          else if (error.status === 401 || error.status === 422) {
            // this.error = true;
            // this.loginError = "Invalid Credentials. Please Enter valid Details ";
            console.log("error log list: ", error);
            console.log("error log list: ", error.statusText);
            console.log("error log list: ", error.message);
            //  localStorage.clear();
            // this.generalts.loginAgain();  
            // this.hide = true; 
            // this.location.back();

            this.router.navigateByUrl('/opem');
          }
        });
  }
  async get_stud() {
    const load = await this.generalts.loading("Loading ...");
    await load.present();

    var data = "";

    this.auth.g_get(data, "students", this.token).subscribe(
      sa => {
        load.dismiss();
        console.log(sa, "da");
        if ([null, undefined, ""].indexOf(sa[0]) == -1) {

          var sas = JSON.stringify(sa);
          console.log(sas, 'dfde');
          localStorage.setItem("stu", sas);

          localStorage.setItem("c_stud", sa[0].student_id);
          //  alert("password");
          this.student_l = sa;

          console.log(sa[0].student_id, "sassas");
        } else if ([null, undefined, ""].indexOf(sa[0]) > -1) {
          // alert("No Students found");
          this.NostudentAlert();
        }
      },
      error => {
        load.dismiss();
        console.error("Error!", error.status_code, error.message);
        if (error.status_code == 400) {
          this.err = error.message;
        } else if (error.status === 401 || error.status === 422) {
          // this.error = true;
          // this.loginError = "Invalid Credentials. Please Enter valid Details ";
          console.log("error log list: ", error);
          console.log("error log list: ", error.statusText);
          console.log("error log list: ", error.message);
          //  localStorage.clear();
          // this.generalts.loginAgain();  
          // this.hide = true; 
          // this.location.back();

          this.router.navigateByUrl('/opem');
        }
      }
    );
  }

  async NostudentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No Student',
      message: 'Logout',
      backdropDismiss: false,
      buttons: [
        {
          text: 'close app',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            localStorage.clear();
            this.router.navigate(['/opem']);
            navigator["app"].exitApp();

            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Logout',
          handler: () => {
            localStorage.clear();
            this.router.navigate(['/opem']);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  // async presentPopover() {
  //   console.log("asdfasd");

  //   const popover = await this.popoverController.create({
  //     component: PopComponent
  //     //cssClass: "mod"
  //     // event: ev,
  //     //  translucent: true
  //   });
  //   return await popover.present();
  // }

  address() {
    console.log("asdfasd");

    this.add = true;
  }
  segmentChanged() {
    console.log("asdf");
  }

  async presentPopover() {
    this.submenu = !this.submenu
    if (!this.submenu) {
      this.generalts.popoverController.dismiss()
      return
    }
    this.generalts.presentPopover1().then((data) => {
      console.log(this.generalts.instituteHit, "da;");
      if (this.generalts.instituteHit) {
        this.stud();
        this.generalts.instituteHit = !this.generalts.instituteHit;
      }
      console.log(this.generalts.instituteHit, "da 123");

    });
  }  

}

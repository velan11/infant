import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { MenuPage } from '../menu/menu.page';
import { MenuextraPage } from '../menuextra/menuextra.page';
import { PopComponent } from 'src/app/proj/pop/pop.component';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.page.html',
  styleUrls: ['./class-list.page.scss'],
})
export class ClassListPage implements OnInit {
  Name: any; token: any;

  reponseData;
  data: any;
  FacClasses: any;
  FacSub_data: any; Institution = [];


  sub: boolean = true;
  submenu: boolean = false;
  constructor(public menu: MenuController,
    public authService: AuthService,
    public general: GeneralService,
    public router: Router,
    private alert: AlertController, public alertController: AlertController
    , public popoverController: PopoverController) { }

  getInstitute() {
    this.authService.get_fac_Institute('teaching-staff/institutions', this.token)
    .subscribe(
      response => {
        this.Institution = response;
        this.institute(response);
        if (this.Institution['institutions'].length == 0) {
          console.log(response, "asdda", response.token);
          alert("You have no Institute");
          localStorage.clear();
          localStorage.removeItem("token");
          localStorage.setItem('value', JSON.stringify(1));
          this.general.router.navigateByUrl('/login');
        }
        else {
          // localStorage.setItem('institute', JSON.stringify(1));
        }
        console.log(response, "response111", response.token);
      }
    )
  }

  async institute(response) {
    let inputArray = [];
    if (response.institutions[0]) {
      for (let name of response.institutions) {

        if (name.id == '1') {
          console.log(name.id, "name.student_id");
          inputArray.push({
            type: "radio",
            label: name.name,
            value: name.id,
            checked: true
          });
        } else {
          inputArray.push({
            type: "radio",
            label: name.name,
            value: name.id,
            checked: false
          });
        }
      }
      console.log(inputArray, "inputArray");
      const alert = await this.alertController.create({
        header: "Select Institute",
        backdropDismiss: false,
        buttons: [
          {
            text: "OK",
            handler: data => {
              console.log("out", data);
              localStorage.setItem("institute", data);
              this.GetFacClasses();
              this.FindUser();
              console.log('kjh', 'me Data');
            }
          }
        ],
        inputs: inputArray
      });
      alert.present();
    }
  }
  async presentPopover() {
    this.submenu = !this.submenu
    if (!this.submenu) {
      this.general.popoverController.dismiss()
      return
    }
    this.general.presentPopover().then((data) => {
      console.log(this.general.instituteHit, "da;");
      if (this.general.instituteHit) {
        this.getInstitute()
        this.general.instituteHit = !this.general.instituteHit;
      }
      console.log(this.general.instituteHit, "da 123");

    });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_faculty");
    let institute = localStorage.getItem("institute");
    if (!institute) {
      this.getInstitute();

    }
    else {
      this.GetFacClasses();

      this.FindUser();
    }
    this.menu.enable(true);
  }

  FindUser() {
    this.authService.g_postt_fac('item', 'me', this.token).subscribe(
      data => {
        console.log(data, "jhfdfhg");
        let response = data;
        this.Name = response.name;
        console.log(response, 'me Data', this.Name);
      }
    )
  }

  GetFacClasses() {
    this.general.loadingPresent()
    this.authService.get_fac_t("teaching-staff/class-guide-attendance/faculty-allocated-classes", this.token).subscribe(
      data => {
        this.FacSub_data = true;
        console.log(data, 'dataget_fac_t');
        let response = (data);
        this.FacClasses = (data);
        console.log(this.FacClasses, "FacClass");
        this.general.loadingDismiss();
      }, (err: any) => {
        if (err.status === 401 || err.status === 422) {
          this.general.loginAgain();
        }
        this.general.loadingDismiss();
      })
  }

  select(s) {
    localStorage.setItem('myParam', JSON.stringify(s));
    this.router.navigate(['/attendance'])
  }

  async presentAlertConfirm() {
    const alert = await this.alert.create({
      header: 'Confirm!',
      message: 'Are You Sure!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Ok');
            this.auth_logout();

          }
        }
      ]
    });

    await alert.present();
  }

  async auth_logout() {
    const load = await this.general.loading("Loading ...");
    load.present();
    this.authService.g_postt_fac('{}', "logout", this.token).subscribe(
      data => {
        console.log(data);
        load.dismiss()
        localStorage.clear();
        localStorage.removeItem("token");
        localStorage.setItem('value', JSON.stringify(1));
        this.router.navigateByUrl('login');
      },
      (err) => {
        this.data = true;
        if (err.status === 401 || err.status === 422) {
          if (err.statusText == 'Unauthorized') {
            localStorage.clear();
            localStorage.removeItem("token");
            alert("session expired!!");
            this.router.navigateByUrl("login");
          }
        }
        if (err.status === 200) {
          alert("Server Connection Error. Please Login Again.");
          localStorage.clear();
        }
      }
    )
  }

  logOut() {
    this.presentAlertConfirm();
  }
 
}

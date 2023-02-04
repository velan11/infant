import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-class-list-mark',
  templateUrl: './class-list-mark.page.html',
  styleUrls: ['./class-list-mark.page.scss'],
})
export class ClassListMarkPage implements OnInit {
  Name: any; token: any;

  reponseData;
  data: any;
  FacSubjects: any;
  MandtorySub: any;
  FacSub_data: any; Institution = [];


  sub: boolean = true;
  submenu: boolean = false;
  constructor(public menu: MenuController,
    public authService: AuthService,
    public general: GeneralService,
    public router: Router,
    public location: Location,
    private alert: AlertController, public alertController: AlertController
    , public popoverController: PopoverController) { }
  // private storage: Storage) { }
  getInstitute() {

    this.authService.get_fac_Institute('teaching-staff/institutions', this.token).subscribe(
      response => {
        this.Institution = response;
        this.institute(response);
        if (this.Institution['institutions'].length == 0) {
          console.log(response, "asdda", response.token);
          alert("You have no Institute");
          localStorage.clear();
          localStorage.removeItem("token");
          localStorage.setItem('value', JSON.stringify(1));
          this.general.router.navigateByUrl('opem');
        }
        else {
          // localStorage.setItem('institute', JSON.stringify(1));

        }
        console.log(response, "response111", response.token);
      })
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
              this.GetFacSubjects();

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

    // const popover = await this.popoverController.create({
    //   component: PopComponent,
    //   cssClass: 'my-custom-class',
    //   event: ev,
    //   translucent: true
    // });
    // await popover.present();

    // const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_faculty");

    // return
    let institute = localStorage.getItem("institute");
    if (!institute) {
      this.getInstitute();

    }
    else {
      this.GetFacSubjects();

      this.FindUser();
    }
    // this.menu.enable(false);
    // this.menu.close();


    // this.GetFacSubjects();
    // console.log('kjh', 'me Data');
    // this.FindUser();
  }

  FindUser() {
    // return
    this.authService.g_postt_fac('item', 'me', this.token).subscribe(
      data => {
        console.log(data, "jhfdfhg");
        let response = data;
        this.Name = response.name;
        console.log(response, 'me Data', this.Name);
      }
    )
  }

  GetFacSubjects() {
    this.authService.get_fac_t("teaching-staff/faculty-subjects", this.token).subscribe(
      data => {
        this.FacSub_data = true;
        console.log(data, 'dataget_fac_t');
        let response = (data);
        this.reponseData = (data);
        this.FacSubjects = response.facultyElectiveSubjects;
        this.MandtorySub = response.facultyMandatorySubjects;
        console.log(this.FacSubjects, "FacSubjects");
      }, (err: any) => {
        if (err.status === 401 || err.status === 422) {
          this.general.loginAgain();
        }
      })
  }

  select(s) {
    localStorage.setItem('myParam', JSON.stringify(s));
    this.router.navigate(['/fac-markentry', { value: JSON.stringify(s) }])
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
        this.router.navigateByUrl('opem');
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
  
  back() {
    this.location.back();
  }
}

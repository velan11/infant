
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  submenu: boolean = false;
  token: any;
  Institution = [];

  constructor( public general: GeneralService,
  public router: Router,
  public alertController: AlertController,
  public popoverController: PopoverController,
  public authService: AuthService,
  public menu: MenuController
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_faculty");
    let institute = localStorage.getItem("institute");
    if (!institute) {
      this.getInstitute();

    }
    else {
      // this.GetFacClasses();

      // this.FindUser();
    }
    
  }

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
    if (response.institutions.length > 1) {
      console.log(response.institutions[0])
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
      
    }
    if (response.institutions.length  ==  1) {
      // for (let name of response.institutions) {
        
        // if (name.id == '1') {
          let inst = response.institutions[0];
          localStorage.setItem("institute", inst.id);
          console.log(inst.id, "name.student_id");
          inputArray.push({
            type: "radio",
            label: inst.name,
            value: inst.id,
            checked: true
          });
        // } else {
        //   inputArray.push({
        //     type: "radio",
        //     label: name.name,
        //     value: name.id,
        //     checked: false
        //   });
        // }
      // }
    }
    const alert = await this.alertController.create({
      header: "Select Institute",
      backdropDismiss: false,
      buttons: [
        {
          text: "OK",
          handler: data => {
            console.log("out", data);
            localStorage.setItem("institute", data);
            // this.GetFacClasses();
            // this.FindUser();
            console.log('kjh', 'me Data');
          }
        }
      ],
      inputs: inputArray
    });
    alert.present();
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

  rout(val) {
    console.log(val, "val");
    this.router.navigate([val]);
  }
  
  

}

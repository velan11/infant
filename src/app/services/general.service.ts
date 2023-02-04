import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LoadingController, ToastController, AlertController, PopoverController, Platform } from "@ionic/angular";
import { Router } from '@angular/router';
import { MenuextraPage } from "../faculty/menuextra/menuextra.page";
import { AuthService } from "./auth.service";
import { Firebase } from "@ionic-native/firebase/ngx";
import { Market } from '@ionic-native/market/ngx';
import { MenupopPage } from "../proj/menupop/menupop.page";

import { Observable, Subject } from "rxjs";



@Injectable({
  providedIn: "root"
})
export class GeneralService {
  data: any;
  instituteHit: boolean = false;
  isLoading = false;
  
  private _listners = new Subject<any>();
  constructor(
    public authService: AuthService,

    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    private firebaseX: Firebase, 
    public alertController: AlertController, 
    public router: Router, 
    public popoverController: PopoverController,
    private market: Market,
    public platform: Platform,
  ) { }

  instituteClose() {
    this.popoverController.dismiss({ institute: "openInstitute" })
  }

  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

  async presentPopover() {

    const popover = await this.popoverController.create({
      component: MenuextraPage,
      animated: false,
      translucent: false,
      cssClass: "extraMenu"
    });

    popover.onDidDismiss()
      .then((result) => {

        console.log(result['data']);
        //  this.insti = result['data'];
        if (result['data']) {
          this.instituteHit = true;
        }
      });

    popover.style.cssText = ' top: 50px !important;';
    await popover.present();



    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  async presentPopover1() {

    const popover = await this.popoverController.create({
      component: MenupopPage,
      animated: false,
      translucent: false,
      cssClass: "extraMenu"
    });

    popover.onDidDismiss()
      .then((result) => {

        console.log(result['data']);
        //  this.insti = result['data'];
        if (result['data']) {
          this.instituteHit = true;
        }
      });

    popover.style.cssText = ' top: 50px !important;';
    await popover.present();



    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  async loginAgain() {
    const alert = await this.alertController.create({
      header: 'Session Expired',
      // subHeader: 'Subtitle',
      message: 'Login Again',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.router.navigate(['/opem']);
          console.log('Confirm Okay');
        }
      }]
    });

    await alert.present();
  }
  firebase_token(data) {
    this.firebaseX
      .getToken()
      .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error("Error getting token", error));

    this.firebaseX
      .onNotificationOpen()
      .subscribe(data => console.log(`User opened a notification ${data}`));
    setTimeout(() => {
      this.refresh_fire();
    }, 1500);
  }
  refresh_fire() {
    this.firebaseX
      .onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }

  async loading(cred) {
    const loadinga = await this.loadingController.create({
      message: cred
      // translucent: true
      //spinner: 'crescent'
    });
    return loadinga;
  }

  async gen_loading() {
    const loading = await this.loadingController.create({
      message: "Loading ...",
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log("Loading dismissed!");
  }

  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: "bottom"
    });

    toast.present();
  }

  async auth_logout() {
    let token = localStorage.getItem("pas_faculty");

    const load = await this.loading("Loading ...");
    load.present();
    this.authService.g_postt_fac('{}', "logout", token).subscribe(
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
            this.router.navigateByUrl("opem");
          }
        }
        if (err.status === 200) {
          alert("Server Connection Error. Please Login Again.");
          localStorage.clear();
        }
      }
    )
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
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
            this.popoverController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }
  logOut() {
    this.presentAlertConfirm();
  }

  //---- new ----//
  async presentAlert_g(data) {
    const alert = await this.alertController.create({
      // header:data,
      // /subHeader: data,
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait ...',
      spinner: 'circles' ,
      cssClass: 'custom-loading',
    }).then(a => {
      return  a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() =>{ console.log('abort laoding')});
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    // return await this.loadingController.dismiss(null);
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    return await this.loadingController.dismiss();
  }
  //-----new End ----//

  async presentAlertVersion(val) {
    const alert = await this.alertController.create({
      header: 'New Updates',
      message: 'The software need to be updated',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            console.log('Confirm Ok');
            if (this.platform.is("android")) {
              console.log(val.app_id)
              this.market.open(
                val.app_id
              );
            } else {
              this.market.open("https://apps.apple.com");
            }
          }
        }
      ]
    });

    await alert.present();
  }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };

}

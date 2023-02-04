import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate
} from "@angular/router";
import { Observable } from "rxjs";
import { MenuController, AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class AaaGuard implements CanActivate {
  userData: any = null;
  faculty=null;
  pas_faculty:any;
  constructor(private _router: Router, public menu: MenuController,public alertController:AlertController) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.userData = localStorage.getItem("pas_tok");
    this.pas_faculty = localStorage.getItem("pas_faculty");
    console.log(this.userData,"userData");
    console.log(this.pas_faculty, 'Faculty');
    if (this.userData||this.pas_faculty) {
      console.log("a");
      return true;
    }
   else {
   // this.loginAgain();
   console.log('logout');
      this._router.navigate(["/login"]);
      return false;
    }
  }

  async loginAgain() {
    const alert = await this.alertController.create({
      header: 'Session Expired',
     // subHeader: 'Subtitle',
      message: 'Login Again',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this._router.navigate(['/login']);
          console.log('Confirm Okay');
        }
      }]
    });

    await alert.present();
  }
}

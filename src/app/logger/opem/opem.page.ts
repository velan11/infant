import { Component, OnInit } from "@angular/core";
import { MenuController, NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: "app-opem",
  templateUrl: "./opem.page.html",
  styleUrls: ["./opem.page.scss"]
})
export class OpemPage implements OnInit {
  constructor(public menu: MenuController,
    public router: Router,
    public navCtrl: NavController,
    public generalts: GeneralService) {}

  ngOnInit() {
    //localStorage.clear();
    this.login_check();
  }
  ionViewWillEnter() {
    this.menu.enable(false);
    this.menu.swipeGesture(false);
  }
  push(data) {
    console.log(data);
    this.router.navigate(["/login", { page:data}]);
  }

  async login_check() {
    let pass_faculty = localStorage.getItem('pas_faculty');
    let pass_parent = localStorage.getItem('pas_tok');
    const load = await this.generalts.loading("Loading ...");
    await load.present();
    if(pass_faculty) {
      this.menu.enable(false);
      this.menu.swipeGesture(false);
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

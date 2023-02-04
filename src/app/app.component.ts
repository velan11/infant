import { Component } from "@angular/core";
import { Platform, MenuController, ToastController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { Network } from "@ionic-native/network/ngx";
import { AuthService } from "./services/auth.service";
import { GeneralService } from "./services/general.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  navigate: any = [
    {
      title: "Home",
      url: "/home",
      icon: "home",
    },
    {
      title: "Profile",
      url: "/profile",
      icon: "school",
    },
    {
      title: "Notification",
      url: "/noti",
      icon: "notifications-outline",
    },
    {
      title: "Attendance",
      url: "/attendanc",
      icon: "calendar",
    },
    {
      title: "Fee",
      url: "/fee-payment",
      icon: "pricetag-outline",
    },
    // {
    //   title: "eWallet",
    //   url: "/ewallet-dashboard",
    //   icon: "wallet"
    // },
    {
      title: "Progress Report",
      url: "/marks-list",
      icon: "book-outline",
    },

    {
      title: "Contact Us",
      url: "/contact",
      icon: "call",
    },
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    public toastController: ToastController,
    public router: Router,
    public network: Network,
    public authService: AuthService,
    public gelService: GeneralService
  ) {
    this.initializeApp();
    this.sideMenu();
    this.backbuttonEvent();
    this.NetworkStatus();
    this.Checkversion();
  }

  ionViewWillEnter() {
    console.log("app test");
  }
  logot() {
    localStorage.clear();
    this.router.navigate(["/opem"]);
    this.menu.close();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  backbuttonEvent() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url === "/home") {
        navigator["app"].exitApp();
      } else if (this.router.url === "/dashboard") {
        navigator["app"].exitApp();
      } else if (this.router.url === "/opem") {
        navigator["app"].exitApp();
      } else {
        window.history.back();
      }
    });
  }
  NetworkStatus() {
    let disconct = this.network.onDisconnect();
    console.log("disconct", disconct);
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log("Network was disconnected :-(");
      this.presentToast("Your in offline");
    });
    (error) => {
      //  alert("eroor");
    };
    // disconnectSubscription.unsubscribe();
    let conc = this.network.onConnect();
    console.log(conc, "connected");
    //  disconnectSubscription.unsubscribe();
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.presentToast(this.network.type + " " + "network was connected");
    });

    // stop connect watch
    // connectSubscription.unsubscribe();
  }

  async presentToast(as) {
    const toast = await this.toastController.create({
      message: as,
      duration: 2000,
    });
    toast.present();
  }

  sideMenu() {
    // this.menu.enable(false);
    // this.menu.swipeGesture(false);
    console.log(localStorage.getItem("pas_faculty"));
    console.log(this.navigate, "asdf");
    if (localStorage.getItem("pas_faculty")) {
      this.navigate = [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: "home",
        },
        {
          title: "Attendance",
          url: "/class-list",
          icon: "",
          src: "../assets/images/calendar.png",
        },
        {
          title: "Assignment / Notice",
          url: "/assign-faculty",
          icon: "",
          src: "../assets/images/circular.png",
        },
        {
          title: "Mark Entry",
          url: "/class-list-mark",
          icon: "",
          src: "../assets/images/progress-report.png"
        },
        {
          title: "Remarks For Mark Card",
          url: "/mark-remarks",
          icon: "",
          src: "../assets/images/progress-report.png",
        },
        
        {
          title: "Change Password",
          url: "/fac-password",
          icon: "",
          src: "../assets/images/profile.png",
        },
      ];
    } else if (localStorage.getItem("pas_tok")) {
      this.navigate = [
        {
          title: "Home",
          url: "/home",
          icon: "home",
        },
        {
          title: "Profile",
          url: "/profile",
          icon: "school",
        },
        {
          title: "Notification",
          url: "/noti",
          icon: "notifications-outline",
        },
        {
          title: "Attendance",
          url: "/attendanc",
          icon: "calendar",
        },
        {
          title: "Assignment / Notice",
          url: "/circular",
          icon: "",
          src: "../assets/images/circular.png",
        },
        {
          title: "Progress Report",
          url: "/marks-list",
          icon: "book-outline",
        },
        {
          title: "Fee",
          url: "/fee-payment",
          icon: "pricetag-outline",
        },
        // {
        //   title: "eWallet",
        //   url: "/ewallet-dashboard",
        //   icon: "wallet"
        // },
        {
          title: "Contact Us",
          url: "/contact",
          icon: "call",
        },
      ];
    }
  }
  prof() {
    this.menu.close();
    this.router.navigate(["/profile"]);
  }
  ionWillOpenw() {
    console.log("menu open");
    this.sideMenu();
  }

  Checkversion() {
    let path = "get-mobile-app-version";
    let data = {
      app_id: "biz.atconline.pacifyca.infant.jesus",
      os_id: "0",
    };
    // this.gelService.presentAlertVersion('1.0.0');
    this.authService.postVersionDetails(path, data).subscribe(
      (data) => {
        let val = data.currentAppVersion;
        console.log(val, "versionData");
        console.log(val.version, "versionData");
        //if (val[0].Version != "1.4.1") {
        if (val.version != "1.0.6") {
          console.log("version update must");
          this.gelService.presentAlertVersion(val);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

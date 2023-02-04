import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { AuthService } from "src/app/services/auth.service";
import { IonInfiniteScroll } from "@ionic/angular";
import { Router } from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: "app-noti",
  templateUrl: "./noti.page.html",
  styleUrls: ["./noti.page.scss"]
})
export class NotiPage implements OnInit {
  @ViewChildren(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  token: any;
  num: any;
  none: boolean = false;
  notifi = [];
  next_page_url: any;
  constructor(
    public generalts: GeneralService,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_tok");
    console.log("afs");
    this.getnoti();
  }
  datP(da){
    // var o=new Date(da).toUTCString();
    // var gmtDateTime = moment.utc(da, "YYYY-MM-DD HH")
    // var local = gmtDateTime.local().format('YYYY-MMM-DD h:mm A');
var oi=moment(da).format('lll'); 
return oi;
//console.log(da,"got date",o,gmtDateTime,"local",local,"oi",oi);
  }
  read_noti(id, full_d) {
    this.router.navigate(["/noti-view", full_d]);

    console.log(id, "id");

    var link = "notifications/" + id + "/read";
    console.log(link, "link");
    var data = "";
    this.auth.g_put(data, link, this.token).subscribe(noti_read => {
      console.log(noti_read, "noti_read");
    });
  }

  loadData(event) {
    setTimeout(() => {
      console.log("Done", this.next_page_url);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll last_page_url last_page_url
      var link = this.next_page_url;
      console.log(link, "link0o0");
      this.auth.noti_scrol(link+"&limit=25", this.token).subscribe(absent => {
        console.log(absent.next_page_url, "loabsentadData123");
        event.target.complete();

        this.next_page_url = absent.next_page_url;

        for (let index = 0; index < absent.data.length; index++) {
          console.log(absent.data, "loabsentadData12399887");
          const element = absent.data[index];
          this.notifi.push(element);
        }

        console.log(this.notifi, "loabsentadData", absent.data);
      });
      // console.log(absent, "loadData");
      if (link == undefined||link == null) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    console.log(this.infiniteScroll, "toggleInfiniteScroll");

    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async getnoti() {
    const load = await this.generalts.loading("Loading ...");
    await load.present();

    var stud = localStorage.getItem("c_stud");
    var data = "";
    var c_stu = localStorage.getItem("c_stud");

    //this.dateMulti = [];
    // var link = "notifications";
    var link = "student/" + c_stu + "/notifications?limit=25";
    //var link = "notifications?limit=25";
    console.log(link, "link");
    this.auth.g_get(data, link, this.token).subscribe(absent => {
      this.next_page_url = absent.next_page_url;
      this.notifi = absent.data;
      console.log(absent, "absent78", absent.data);

      load.dismiss();
      if (absent.data.length == 0) {
        this.none = true;
      } else {
        this.none = false;
      }
    },error => {
      load.dismiss();
      console.error("Error!", error.status_code, error.message);
      if(error.status == 401 ) {
        this.auth.loginAgain();
        //this.router.navigateByUrl('/login');
      }else if (error.status_code == 400) {
        //this.err = error.message;
      }
    });
  }
}

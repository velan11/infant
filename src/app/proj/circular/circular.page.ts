import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.page.html',
  styleUrls: ['./circular.page.scss'],
})
export class CircularPage implements OnInit {
  token: any;
  err: any; userData: any;
  circularData: any = [];
  none: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  error: any;
  constructor(
    public platform: Platform,
    private router: Router,
    public authService: AuthService,
    public generalts: GeneralService) { }

  ngOnInit() {
  }
  openCircular(item) {
    this.router.navigate(["/circularsingle", { notice_id: item.notice_id }])
  }

  ionViewWillEnter() {
    //{{ API_URL  }}/student/3289/notices?type=Notices > Type 1&paginate=3
    this.token = localStorage.getItem("pas_tok");
    this.circularData = [];
    this.page = 1;
    this.perPage = 0;
    this.totalData = 0;
    this.totalPage = 0;
    this.getCircular();
  }

  async getCircular() {
    const load = await this.generalts.loading("Loading ...");
    await load.present();

    var data = "";
    var c_stu = localStorage.getItem("c_stud");
    var link = "student/" + c_stu + "/notices?type=Notices&paginate=0&page="+this.page;
    console.log(link, "link", "this.c_stud ", c_stu);
    this.authService.g_get(data, link, this.token).subscribe(
      data => {
        load.dismiss();
       

        this.circularData = data.data;

        console.log(data, "prof123");

        if (this.circularData.length == 0) {
          this.none = true;
        } else {
          this.none = false;
        }

        this.perPage = data.per_page;
        this.totalData = data.to;
        this.totalPage = data.last_page;

      },
      error => {
        load.dismiss();
        console.error("Error!", error.status_code, error.message);
        if(error.status == 401 ) {
          this.authService.loginAgain();
          //this.router.navigateByUrl('/login');
        }else if (error.status_code == 400) {
          this.err = error.message;
        }
      }
    );
  }

  doInfinite(event) {
    
    this.page = this.page+1;
    var data = '';
    var c_stu = localStorage.getItem("c_stud");
    var link = "student/" + c_stu + "/notices?type=Notices&paginate=0&page="+this.page;
    console.log(this.page)
    setTimeout(() => {
      
      this.authService.g_get(data, link, this.token)
          .subscribe(res => {
            console.log(res)
            let t = res.data;
            //this.transaction = t.data;
            this.perPage = res.per_page;
            this.totalData = res.to;
            this.totalPage = res.last_page;
            //console.log(this.transaction);
            for(let i=0; i< t.length; i++) {
              this.circularData.push(t[i]);
            }
          },  error => {
            this.generalts.loadingDismiss();
            if(error.status == 401 ) {
             
              this.authService.loginAgain();
              //this.router.navigateByUrl('/login');
            
          }
         else if (error.status_code == 400) {
            this.error = error.message;
            console.error("Error!", error.status_code, error.message);
            this.generalts.presentAlert_g(this.error);
          }
          else{
            this.generalts.presentAlert_g("Please check your Internet Connection");
          }
        })
        event.target.complete();

          //infiniteScroll.complete();
    }, 1000);
    
  }
}

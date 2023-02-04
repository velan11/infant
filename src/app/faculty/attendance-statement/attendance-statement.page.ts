import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-attendance-statement',
  templateUrl: './attendance-statement.page.html',
  styleUrls: ['./attendance-statement.page.scss'],
})
export class AttendanceStatementPage implements OnInit {

  token:any;
  cout =0;
  date:any;
  statmentObj:any;
  displyShortage:any;
  fillType="outline";
  viewStatment:any;
  showList:boolean = true;
  btnText = "Show Shortage List";
  shortage= "Show Full List";
  showShortage ="SHORTAGE"

  constructor(private router: Router,
    private authService: AuthService,
    public alert: AlertController,
    private general:  GeneralService) { }

  ngOnInit() {
    this.token = localStorage.getItem("pas_faculty");
    let obj = JSON.parse(localStorage.getItem("sheet"));
    this.date = JSON.parse(localStorage.getItem("date"));
    this.statmentObj = obj;
    this.displayAttndSheet();
  }

  displayAttndSheet(){
    moment().format('hh:mm a');
    console.log(this.date)
    let page = `teaching-staff/class-guide-attendance/attendance-statement?institution_id=${this.statmentObj.institution_id}&year_id=${this.statmentObj.year_id}&academic_year_id=${this.statmentObj.academic_year_id}&course_id=${this.statmentObj.course_id}&batch_id=${this.statmentObj.batch_id}&date=${this.date}&attendanceStatementType=ALL&showOnlyActiveStudents=true`;
    this.general.loadingPresent();
    this.authService.get_fac_t(page, this.token).subscribe(data =>{
      this.viewStatment = data;
      this.general.loadingDismiss();
    },
    (err: any) => {
      if (err.status === 401 || err.status === 422) {
        localStorage.clear();
        this.alertMeassage('Session expierd');
        this.router.navigateByUrl('/login');
      }
      if (err.status === 200) {
        this.alertMeassage("Server Connection Error. Please Login Again.");
        localStorage.clear();
      }
      this.general.loadingDismiss();
    }
    )
  }

  showlist(){
    this.cout = this.cout +1;
    if( this.cout%2 == 0){
      this.showList = true;
      this.fillType="outline";
      
    }else {
      this.showList = false;
      this.fillType="solid";
    }
    this.cout%2 == 0 ? this.btnText="Show Shortage List":this.btnText="Show complete List";
    let status;
    this.cout%2 == 0 ? status="ALL": status="SHORTAGE";

    let page = `teaching-staff/class-guide-attendance/attendance-statement?institution_id=${this.statmentObj.institution_id}&year_id=${this.statmentObj.year_id}&academic_year_id=${this.statmentObj.academic_year_id}&course_id=${this.statmentObj.course_id}&batch_id=${this.statmentObj.batch_id}&date=${this.date}&attendanceStatementType=${status}&showOnlyActiveStudents=true`;
    this.general.loadingPresent();
    this.authService.get_fac_t(page, this.token).subscribe(data =>{
      this.displyShortage =  data;
      this.general.loadingDismiss();
    },
    (err: any) => {
      if (err.status === 401 || err.status === 422) {
        localStorage.clear();
        this.alertMeassage('Session expierd');
        this.router.navigateByUrl('/login');
      }
      if (err.status === 200) {
        this.alertMeassage("Server Connection Error. Please Login Again.");
        localStorage.clear();
      }
      this.general.loadingDismiss();
    }
    )

  }

   //Alert Message
   async alertMeassage(data) {
    const alert = await this.alert.create({
      header: 'Alert Message!',
      message: data,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
}

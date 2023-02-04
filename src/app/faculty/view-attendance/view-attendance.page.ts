import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.page.html',
  styleUrls: ['./view-attendance.page.scss'],
})
export class ViewAttendancePage implements OnInit {

  facData: any = [];
  token: any;
  displaySheet:any;

  constructor(private authService: AuthService,
    private router: Router,
    public toastController: ToastController,
    public alert: AlertController,
    private general:  GeneralService) { }

  ngOnInit() {
    this.token = localStorage.getItem("pas_faculty");
    this.facData = JSON.parse(localStorage.getItem('myParam'));
    this.getDisplaySheet();
  }
  
  getDisplaySheet() {
    moment().format('hh:mm a');
    this.general.loadingPresent()
    let page = `teaching-staff/class-guide-attendance/attendance-sheet?institution_id=${this.facData.institution_id}&year_id=${this.facData.year_id}&academic_year_id=${this.facData.academic_year_id}&course_id=${this.facData.course_id}&batch_id=${this.facData.batch_id}`;
    this.authService. get_fac_t(page, this.token)
    .subscribe(
      data =>{
        this.displaySheet = data;
        this.general.loadingDismiss();
      },
      (err: any) => {
        if (err.status === 401 || err.status === 422) {
          localStorage.clear();
          this.alertMeassage('Session expierd');
          this.router.navigateByUrl('');
        }
        if (err.status === 200) {
          this.alertMeassage("Server Connection Error. Please Login Again.");
          localStorage.clear();
        }
        this.general.loadingDismiss();
      } 
    );
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

import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Location } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { RemarkModalPage } from '../remark-modal/remark-modal.page';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mark-remarks',
  templateUrl: './mark-remarks.page.html',
  styleUrls: ['./mark-remarks.page.scss'],
})
export class MarkRemarksPage implements OnInit {
  token: any;
  years: any;
  yearId: any;
  length: any;
  assessmentParticular: any;
  studentDetails: any;
  particularsId:any;
  myForm: FormGroup; 
  count = 0;
  
  compareWith : any ;
  // compareWithFn(o1, o2) {
  //   return o1 === o2;
  // };
  constructor(public authService: AuthService,
    public general: GeneralService,
    public router: Router,
    public location: Location,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    ) {
      this.token = localStorage.getItem("pas_faculty");

    // return
    let institute = localStorage.getItem("institute");
      this.general.listen().subscribe((m: any) => {
        console.log(m, 'fdf34');
        console.log(localStorage.getItem('event'))
        //  this.getRefresh(localStorage.getItem('event'));
      })

     
     }
     

     @HostListener("keyup.enter") onKeyupEnter() {
      var nextEl = this.findNextTabStop(document.activeElement);
      nextEl.focus();
      // or try for ionic 4:
      // nextEl.setFocus();
    }

    findNextTabStop(el) {
      var universe = document.querySelectorAll(
        "input, button, select, textarea, a[href]"
      );
      var list = Array.prototype.filter.call(universe, function(item) {
        return item.tabIndex >= "0";
      });
      var index = list.indexOf(el);
      return list[index + 1] || list[0];
    }
  ngOnInit() {
    console.log('df')
    this.myForm = this.formBuilder.group({
      remark0: [''],
    });
    // this.particularsId = 85;
    // this.compareWith = this.compareWithFn;
    
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ionViewWillEnter() {
    // window.location.reload();
    this.token = localStorage.getItem("pas_faculty");
console.log('ds');
    // return
    let institute = localStorage.getItem("institute");
    // this.MyDefaultYearIdValue = 85 ;
    
    this.getClassGuide();
    
  }


  
  getClassGuide() {
    this.general.loadingPresent();
    this.authService.get_fac_t("teaching-staff/class-guide-marks-card-remarks/class-guide-details", this.token).subscribe(data => {
      console.log(data);
      // 
      this.general.loadingDismiss();
      let assessmentParticular = data['assessmentParticularIds'];
      this.assessmentParticular = Object.keys(assessmentParticular).map(function(index) {
        let a = assessmentParticular[index];
        
        return a;
      })

      let particularsId = this.assessmentParticular.filter(particular => particular.main == 1);
      this.particularsId = particularsId[0].id;
      console.log(this.particularsId, 'sd');
      this.length = data['yearIds'].length;
      // if(this.length == 1) {
        let y = data['yearIds'];
        this.yearId = y[0].id;
      // }
      this.years = data['yearIds'];
      this.getRefresh(this.particularsId, this.yearId)
    },(error) => {
      console.log(error);
      this.general.loadingDismiss();
      if (error.status == 401 || error.status == 422 || error.status == 0) {
        if (error.statusText == "Unauthorized") {
          this.general.loginAgain();
          this.router.navigateByUrl("/opem");
        }
      }
    })
  }

  getYear(year) {
    
    this.yearId = year.detail['value'];
  }

  getStudent(event) {
    localStorage.setItem('event', event.detail['value']);
    this.general.loadingPresent();
    let particularsId= event.detail['value'];
    this.particularsId = particularsId;
    this.authService.get_fac_t("teaching-staff/class-guide-marks-card-remarks/fetch-students?year_id="+this.yearId +"&assessment_Id="+ particularsId, this.token).subscribe(data => {
      console.log(data);
      this.count = data.length;
      this.studentDetails = data;
      this.general.loadingDismiss();
      for(var i=0; i<this.count; i++) {
        this.myForm.addControl('remark'+i, new FormControl(''));
        this.myForm.controls['remark'+i].setValue(this.studentDetails[i].remarks);
            this.myForm.get('remark'+i).updateValueAndValidity();
      }

      
    },(error) => {
      console.log(error);
      this.general.loadingDismiss();
      if (error.status == 401 || error.status == 422 || error.status == 0) {
        if (error.statusText == "Unauthorized") {
          this.general.loginAgain();
          this.router.navigateByUrl("/opem");
        }
      }
    });
  }

  getRefresh(event, yearId) {
    console.log(this.yearId)
    // this.general.loadingPresent();
    let particularsId= event;
    // this.particularsId = particularsId;
    this.authService.get_fac_t("teaching-staff/class-guide-marks-card-remarks/fetch-students?year_id="+yearId +"&assessment_Id="+ particularsId, this.token).subscribe(data => {
      console.log(data);
      this.count = data.length;
      this.studentDetails = data;
      for(var i=0; i<this.count; i++) {
        this.myForm.addControl('remark'+i, new FormControl(''));
        this.myForm.controls['remark'+i].setValue(this.studentDetails[i].remarks);
            this.myForm.get('remark'+i).updateValueAndValidity();
      }
      // this.general.loadingDismiss();
    },(error) => {
      console.log(error);
      // this.general.loadingDismiss();
      if (error.status == 401 || error.status == 422 || error.status == 0) {
        if (error.statusText == "Unauthorized") {
          this.general.loginAgain();
          this.router.navigateByUrl("/opem");
        }
      }
    });
  }

  back() {
    this.location.back();
  }

  async delete(student) {
    let data = {
      "studentDetail":{
        "class_guide_allocations_id": student.class_guide_allocations_id,
        "remarks": student.remarks,
        "student_id": student.student_id,
        "student_name": student.student_name,
        "roll_no": student.roll_no,
      },
      "assessmentParticularId": this.particularsId
    }; 
    console.log(data)
    this.general.loadingPresent()
    this.authService.g_postt_fac(data ,'teaching-staff/class-guide-marks-card-remarks/delete-remarks', this.token).subscribe(
      response => {
        this.general.loadingDismiss();
        console.log(response);
        if(response.status) {
          this.general.showToast(response.message);
        }
        this.general.filter('Deleted');
        // location.reload();
      },(error) => {
        console.log(error);
        this.general.loadingDismiss();
        if (error.status == 401 || error.status == 422 || error.status == 0) {
          if (error.statusText == "Unauthorized") {
            this.general.loginAgain();
            this.router.navigateByUrl("/opem");
          }
        }
      });
    // const alert = await this.alertController.create({
    //   header: 'Confirm!',
    //   message: "Are you sure you want to delete?",
    //   buttons: [
    //     {
    //       text: 'No',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       handler: (blah) => {
    //         console.log('Confirm Cancel: blah');
    //       }
    //     }, {
    //       text: 'Yes',
    //       handler: () => {
           
    //         // this.popoverController.dismiss();
    //       }
    //     }
    //   ]
    // });

    // await alert.present();
  }

  async edit(value, student) {
    if(value.detail['value'] != '') {
      let data = {
        "editStudentRemarks":{
          "class_guide_allocations_id":student.class_guide_allocations_id,
          "remarks": value.detail['value'],
          "student_id": student.student_id,
          "student_name": student.student_name,
          "roll_no": student.roll_no
        },
        "assessmentParticularId": this.particularsId
      }
      console.log(data);
      // this.general.loadingPresent()
      this.authService.g_postt_fac(data ,'teaching-staff/class-guide-marks-card-remarks/save-remarks', this.token).subscribe(
        response => {
          // this.general.loadingDismiss();
          console.log(response);
          if(response.status) {
            this.general.showToast(response.message);
          }
          
          // this.general.filter('Added');
          // this.modalCtrl.dismiss();
        },(error) => {
          console.log(error);
          // this.general.loadingDismiss();
          if (error.status == 401 || error.status == 422 || error.status == 0) {
            if (error.statusText == "Unauthorized") {
              this.general.loginAgain();
              this.router.navigateByUrl("/opem");
            }
          }
        });
    }

    if(value.detail['value'] == '') {
      this.delete(student)
    }
    

    // const modal = await this.modalCtrl.create({
    //   component: RemarkModalPage,
    //   componentProps: {
    //     "data" : student,
    //     "assessmentParticularId": this.particularsId,
    //   }
    // });

    // modal.present();
  }

  

}

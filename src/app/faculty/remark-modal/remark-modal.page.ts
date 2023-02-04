import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-remark-modal',
  templateUrl: './remark-modal.page.html',
  styleUrls: ['./remark-modal.page.scss'],
})
export class RemarkModalPage implements OnInit {
  myForm: FormGroup;
  studentDetails: any;
  assessmentParticularId: any;
  token: any;
  constructor(private formBuilder: FormBuilder,
    private navParams: NavParams,
    private authService: AuthService,
    private general: GeneralService,
    private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      remark: ['', Validators.required]
    });
    this.studentDetails = this.navParams.get('data');
    this.assessmentParticularId = this.navParams.get('assessmentParticularId');
    console.log(this.assessmentParticularId, 'd')

  }

  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_faculty");
    this.myForm.controls['remark'].setValue(this.studentDetails.remarks);
  }
  ionViewDidLeave() {
    console.log('ashok');
  }
  create() {
    console.log(this.myForm.controls['remark'].value,)
    let data = {
      "editStudentRemarks":{
        "class_guide_allocations_id":this.studentDetails.class_guide_allocations_id,
        "remarks": this.myForm.controls['remark'].value,
        "student_id": this.studentDetails.student_id,
        "student_name": this.studentDetails.student_name,
        "roll_no": this.studentDetails.roll_no
      },
      "assessmentParticularId": this.assessmentParticularId
    }
    this.general.loadingPresent()
    this.authService.g_postt_fac(data ,'teaching-staff/class-guide-marks-card-remarks/save-remarks', this.token).subscribe(
      response => {
        this.general.loadingDismiss();
        console.log(response);
        if(response.status) {
          this.general.showToast(response.message);
        }
        
        this.general.filter('Added');
        this.modalCtrl.dismiss();
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
    console.log(data)
  }

}

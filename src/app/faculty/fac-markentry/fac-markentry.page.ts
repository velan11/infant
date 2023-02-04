import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { SaveMarksPage } from '../save-marks/save-marks.page';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fac-markentry',
  templateUrl: './fac-markentry.page.html',
  styleUrls: ['./fac-markentry.page.scss'],
})
export class FacMarkentryPage implements OnInit {
  facData: any
  token: any;
  internalAssessment: any;
  examParticulars: any;
  setting: any;
  constructor(private authService: AuthService,
    private modalCtrl: ModalController,
    private general: GeneralService,
    private router: Router,
    private location: Location ) {
    this.facData = JSON.parse(localStorage.getItem('myParam'));
    console.log(this.facData)
    this.token = localStorage.getItem("pas_faculty");
    this.general.listen().subscribe((m: any) => {
      console.log(m, 'fdf34');
      
       this.getInternal();
    })
   }

  ngOnInit() {
    this.getInternal();
  }

  ionViewWillEnter() {
  }

  back() {
    console.log('df')
    this.location.back();
  }
   getInternal() {
    this.general.loadingPresent();
    console.log(this.facData.academic_year_id);
    this.authService.get_fac_t("teaching-staff/internal-assessment/internal-assessment-marks-entry?academic_year_id="+this.facData.academic_year_id+"&institution_id="+this.facData.institution_id+ "&semester_id="+this.facData.academic_period_id+"&elective_subject_id="+this.facData.elective_subject_id+"&stream_id=null"+"&employee_detail_id="+this.facData.employee_detail_id+"&faculty_division_allocation_id="+this.facData.id+"&division_id="+this.facData.division_id+"&subject_code="+this.facData.subject_code, this.token).subscribe(
      data => {
        this.general.loadingDismiss();
        console.log(data, 'fdd');
        this.examParticulars = data['examParticulars'];
        let examSetting = data['examinationSettings'];
        let generalSettings = data['generalSettings'];
        this.setting = {
          "disable_projected_cia": examSetting.disable_projected_cia,
          "display_batch": examSetting.display_batch,
          "display_class": examSetting.display_class,
          "enable_reason_input_in_teaching_staff_internal_assessement": examSetting.enable_reason_input_in_teaching_staff_internal_assessement,
          "enable_grade_column_in_internal_assessment_marks":generalSettings.enable_grade_column_in_internal_assessment_marks

        };
        console.log(this.setting);
        this.internalAssessment = data['internalAssessmentParticulars'];
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

  async select(s, e) {
    console.log(s, 'ss');
    console.log(e, 'ee');
    console.log(this.facData)

    var jsonData = { 

      "faculty_division_allocation_id": this.facData.id,
      
      "employee_detail_id": this.facData.employee_detail_id, 
      
      "iaconfig_id": s.iaconfig_id,
      
      "internal_assessment_particular_id": s.internal_assessment_particular_id,
      
      "elective_subject_id": this.facData.elective_subject_id,
      
      "academic_year_id": this.facData.academic_year_id,
      
      "institution_id": this.facData.institution_id,
      
      "semester_id": this.facData.academic_period_id,
      
      "division_id": this.facData.division_id,
      
      "exam_particular_id": e.id
      
      };

    console.log(jsonData);

   
    const modal = await this.modalCtrl.create({
      component: SaveMarksPage,
      componentProps: {
        "data" : jsonData,
        "internalAssessment": s,
        "facDt": this.facData,
        "settings": this.setting,
      }
    });

    modal.present();

  }

}

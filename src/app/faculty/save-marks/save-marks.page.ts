import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-marks',
  templateUrl: './save-marks.page.html',
  styleUrls: ['./save-marks.page.scss'],
})
export class SaveMarksPage implements OnInit {
  @Input() data: string;
  studentList: any;
  facData:any;
  token: any;
  internalAssessentarks: any;
  internalAssessment: any;
  myForm: FormGroup;count:any;
  isFinalSubmitted = false;
  facDt: any;
  settings: any;
  isDisable = [];
  isStudent = true;
  isMark = true;
  isGrade = true;
  isBatch = false;
  isReason = true;
  isCia = false;
  constructor(private modalCtrl: ModalController, 
    private navParams: NavParams,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private alertController: AlertController,
    public popoverController: PopoverController,
    private router: Router) {
    console.log(navParams.get('data'), 'd')
    this.facData = this.navParams.get('data');
    this.internalAssessment = this.navParams.get('internalAssessment');
    this.facDt = this.navParams.get('facDt');
    this.settings = this.navParams.get('settings');
    this.isFinalSubmitted = this.internalAssessment.final_save != null ? true : false;
    console.log(this.settings.enable_grade_column_in_internal_assessment_marks)
    this.token = localStorage.getItem("pas_faculty");
    this.generalService.listen().subscribe((m: any) => {
      console.log(m, 'fdf34');
     
       this.getStudents();
    })
  }
  ngOnInit() {
    this.myForm = this.formBuilder.group({
      form0: [''],
      grade0: [''],
      reason0: [''],
      
    });
    // this.getStudents();
  }

  ionViewWillEnter() {
    this.getStudents();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getStudents() {
    this.generalService.loadingPresent();
    this.authService.get_fac_t(`teaching-staff/internal-assessment/assigned-students?academic_year_id=${this.facData.academic_year_id}&division_id=${this.facData.division_id}&elective_subject_id=${this.facData.elective_subject_id}&employee_detail_id=${this.facData.employee_detail_id}&exam_particular_id=${this.facData.exam_particular_id}&faculty_division_allocation_id=${this.facData.faculty_division_allocation_id}&iaconfig_id=${this.facData.iaconfig_id}&institution_id=${this.facData.institution_id}&internal_assessment_particular_id=${this.facData.internal_assessment_particular_id}&semester_id=${this.facData.semester_id}`, this.token).subscribe(
      response => {
        this.studentList  = response;
        this.internalAssessentarks = this.studentList.internalAssessmentMarks;
        this.count = this.internalAssessentarks.length;
        console.log(this.studentList);
        var studentdata = this.studentList.studentData;
        console.log(studentdata)
        for(var i=0; i<this.count; i++) {
          if(this.settings.enable_reason_input_in_teaching_staff_internal_assessement == 1) {
            this.myForm.addControl('reason'+i, new FormControl(''));
          if(studentdata[i].reason == null) {
            this.myForm.controls['reason'+i].setValue('');
            this.isDisable[i] = false;
            this.myForm.addControl('form'+i, new FormControl(''));
            this.myForm.get('form'+i).setValidators([Validators.required]);
            this.myForm.controls['form'+i].setValue(studentdata[i].set_marks);
            this.myForm.get('form'+i).updateValueAndValidity();
      
            if(this.settings.enable_grade_column_in_internal_assessment_marks == 1) {
              this.myForm.addControl('grade'+i, new FormControl(''));
              this.myForm.get('grade'+i).setValidators([Validators.required]);
              this.myForm.controls['grade'+i].setValue(studentdata[i].set_grades);
              this.myForm.get('grade'+i).updateValueAndValidity();
            }
            // this.myForm.addControl('form'+i, new FormControl('', Validators.required));
            // this.myForm.controls['form'+i].setValue(studentdata[i].set_marks);
            // if(this.settings.enable_grade_column_in_internal_assessment_marks == 1) {
            //   this.myForm.addControl('grade'+i, new FormControl('', Validators.required));
            //   this.myForm.controls['grade'+i].setValue(studentdata[i].set_grades);
            // }
          }else {
            this.isDisable[i] = true;
            this.myForm.controls['reason'+i].setValue(studentdata[i].reason);
          }
        }else {
          this.myForm.addControl('form'+i, new FormControl(''));
            this.myForm.get('form'+i).setValidators([Validators.required]);
            this.myForm.controls['form'+i].setValue(studentdata[i].set_marks);
            this.myForm.get('form'+i).updateValueAndValidity();
      
            if(this.settings.enable_grade_column_in_internal_assessment_marks == 1) {
              this.myForm.addControl('grade'+i, new FormControl(''));
              this.myForm.get('grade'+i).setValidators([Validators.required]);
              this.myForm.controls['grade'+i].setValue(studentdata[i].set_grades);
              this.myForm.get('grade'+i).updateValueAndValidity();
            }
          // this.myForm.addControl('form'+i, new FormControl('', Validators.required));
          //   this.myForm.controls['form'+i].setValue(studentdata[i].set_marks);
          //   if(this.settings.enable_grade_column_in_internal_assessment_marks == 1) {
          //     this.myForm.addControl('grade'+i, new FormControl('', Validators.required));
          //     this.myForm.controls['grade'+i].setValue(studentdata[i].set_grades);
          //   }
        }
          
          this.generalService.loadingDismiss();
        }
      },(error) => {
        console.log(error);
        this.generalService.loadingDismiss();
        if (error.status == 401 || error.status == 422 || error.status == 0) {
          if (error.statusText == "Unauthorized") {
            this.generalService.loginAgain();
            this.router.navigateByUrl("/opem");
          }
        }
      });
  }

  
  onChangeTime(val, student, studentData, i) {
    
    console.log(val.detail['value']);
    console.log(this.internalAssessment);
    console.log(student);
    console.log(studentData);
    if(val.detail['value'] <= this.internalAssessment.max_marks) {
      var studentInternalMarks = { 

        "studentInternalMarks":[{ 
        
          "id": student.id, 
        
          "roll_no": student.roll_no, 
        
          "student_name": student.student_name, 
        
          "batch": student.batch, 
        
          "course_name": student.course_name, 
        
          "set_marks": val.detail['value'], 
        
          "set_grades": (this.settings.enable_grade_column_in_internal_assessment_marks == 1) ? this.myForm.controls['grade'+i].value : studentData.set_grades, 
        
          "internal_marks_id": studentData.internal_marks_id, 
        
          "final_save": this.internalAssessment.final_save, 
        
          "ia_max": this.internalAssessment.ia_max, 
        
          "reason": studentData.reason, 
        
          "freeze_from_date": studentData.freeze_from_date, 
        
          "freeze_from_date_expired": studentData.freeze_from_date_expired, 
        
          "isFreezed": studentData.isFreezed, 
        
          // "Mid Sem": 6, 
        
          // "quiz": 14, 
        
          // "Assignment": 10, 
        
          "total_marks": student.total_marks, 
        
          "internal_marks_convert_marks": student.internal_marks_convert_marks, 
        
          "non_convert_total_marks": student.non_convert_total_marks, 
        
          "ia_marks": student.ia_marks, 
        
          "studentInternalAssessmentPercentage": student.studentInternalAssessmentPercentage, 
        
          "internalAssessmentShortagePercentage": student.internalAssessmentShortagePercentage, 
        
          "internal_assessment_particular_id": this.internalAssessment.internal_assessment_particular_id, 
        
          "convert": this.internalAssessment.convert, 
        
          "iaconfig_id": this.internalAssessment.iaconfig_id, 
        
          "assessment_particulars": this.internalAssessment.assessment_particulars, 
        
          "max_marks": this.internalAssessment.max_marks, 
        
          "mcq": this.internalAssessment.mcq, 
        
          "allocated_faculty": this.internalAssessment.allocated_faculty, 
        
          "disabled_mcq_faculty": this.internalAssessment.disabled_mcq_faculty, 
        
          "exam_particular_id": this.internalAssessment.exam_particular_id, 
        
          "type": this.internalAssessment.type, 
        
          "name": this.internalAssessment.name, 
        
          "enable_association_student_activity_system": this.internalAssessment.enable_association_student_activity_system, 
        
          "no_entry": this.internalAssessment.no_entry 
        
        }] 
        
        };
        // var t = false;
        var t = setTimeout(function(){ 
         return true
      }, 3000);
      console.log(t)
      if(t) {
        this.authService.g_postt_fac(studentInternalMarks ,'teaching-staff/internal-assessment/internal-assessment-marks', this.token).subscribe(
          response => {
            console.log(response, 'sd');
            if(response.status) {
              this.generalService.showToast(response.message);
            }
          },(error) => {
            console.log(error);
            // this.generalService.loadingDismiss();
            if (error.status == 401 || error.status == 422 || error.status == 0) {
              if (error.statusText == "Unauthorized") {
                this.modalCtrl.dismiss();
                this.generalService.loginAgain();
                this.router.navigateByUrl("/opem");
              }
            }
          })
          console.log(studentInternalMarks);
      }
        
        
    }else {
      this.generalService.showToast('Entered Marks should not be greater than maximum marks.. ')
      this.myForm.controls['form'+i].setValue('');
    }

    
  }

  onChangeGrade(val, student, studentData, i) {
    console.log(this.myForm.controls['form'+i].value);
    console.log(val.detail['value']);
    console.log(this.internalAssessment);
    console.log(student);
    console.log(studentData);
    let newValue = val.detail['value'];
    let regExp = new RegExp('^[A-Za-z+?]+$');
    if(regExp.test(newValue) || newValue == '' ) {
      var studentInternalMarks = { 

        "studentInternalMarks":[{ 
        
          "id": student.id, 
        
          "roll_no": student.roll_no, 
        
          "student_name": student.student_name, 
        
          "batch": student.batch, 
        
          "course_name": student.course_name, 
        
          "set_marks": this.myForm.controls['form'+i].value, 
        
          "set_grades": val.detail['value'], 
        
          "internal_marks_id": studentData.internal_marks_id, 
        
          "final_save": this.internalAssessment.final_save, 
        
          "ia_max": this.internalAssessment.ia_max, 
        
          "reason": studentData.reason, 
        
          "freeze_from_date": studentData.freeze_from_date, 
        
          "freeze_from_date_expired": studentData.freeze_from_date_expired, 
        
          "isFreezed": studentData.isFreezed, 
        
          // "Mid Sem": 6, 
        
          // "quiz": 14, 
        
          // "Assignment": 10, 
        
          "total_marks": student.total_marks, 
        
          "internal_marks_convert_marks": student.internal_marks_convert_marks, 
        
          "non_convert_total_marks": student.non_convert_total_marks, 
        
          "ia_marks": student.ia_marks, 
        
          "studentInternalAssessmentPercentage": student.studentInternalAssessmentPercentage, 
        
          "internalAssessmentShortagePercentage": student.internalAssessmentShortagePercentage, 
        
          "internal_assessment_particular_id": this.internalAssessment.internal_assessment_particular_id, 
        
          "convert": this.internalAssessment.convert, 
        
          "iaconfig_id": this.internalAssessment.iaconfig_id, 
        
          "assessment_particulars": this.internalAssessment.assessment_particulars, 
        
          "max_marks": this.internalAssessment.max_marks, 
        
          "mcq": this.internalAssessment.mcq, 
        
          "allocated_faculty": this.internalAssessment.allocated_faculty, 
        
          "disabled_mcq_faculty": this.internalAssessment.disabled_mcq_faculty, 
        
          "exam_particular_id": this.internalAssessment.exam_particular_id, 
        
          "type": this.internalAssessment.type, 
        
          "name": this.internalAssessment.name, 
        
          "enable_association_student_activity_system": this.internalAssessment.enable_association_student_activity_system, 
        
          "no_entry": this.internalAssessment.no_entry 
        
        }] 
        
        };
        // var t = false;
        var t = setTimeout(function(){ 
         return true
      }, 3000);
      console.log(t)
      if(t) {
        this.authService.g_postt_fac(studentInternalMarks ,'teaching-staff/internal-assessment/internal-assessment-marks', this.token).subscribe(
          response => {
            console.log(response, 'sd');
            if(response.status) {
              this.generalService.showToast(response.message);
            }
          },(error) => {
            console.log(error);
            // this.generalService.loadingDismiss();
            if (error.status == 401 || error.status == 422 || error.status == 0) {
              if (error.statusText == "Unauthorized") {
                this.generalService.loginAgain();
                this.modalCtrl.dismiss();
                this.router.navigateByUrl("/opem");
              }
            }
          })
          console.log(studentInternalMarks);
      }
        
    }else{
      this.generalService.showToast('Entered Grade should not be number or special charaters ')
      this.myForm.controls['grade'+i].setValue('');
    }
  }

  async create() {
    console.log('sfd')
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: "Are you sure you want to save? Once saved, you can't edit the marks again. Continue?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Ok');
            var finalData = { 

              "institution_id": this.facData.institution_id, 
              
              "faculty_division_allocation_id":this.facData.faculty_division_allocation_id, 
              
              "iaconfig_id":this.facData.iaconfig_id,
              "sharedFacultyLists":[{
                "faculty_division_allocation_id" : this.facData.faculty_division_allocation_id, 
                
                "iaconfig_id":this.facData.iaconfig_id
              }], 
              
              "academic_year_id": this.facData.academic_year_id, 
              
              "semester_id": this.facData.semester_id, 
              
              "exam_particular_id": this.facData.exam_particular_id, 
              
              "elective_subject_id": this.facData.elective_subject_id,
              
              };
              console.log(finalData);
              this.authService.g_postt_fac(finalData ,'teaching-staff/internal-assessment/final-save', this.token).subscribe(
                response => {
                console.log(response, 'sd');
                if(response.status) {
                  this.generalService.showToast(response.message);
                }
                this.generalService.loadingDismiss();
                // this.getStudents();
                this.generalService.filter('Saved');
                // location.reload()
                this.modalCtrl.dismiss();
                },(error) => {
                  console.log(error);
                  this.generalService.loadingDismiss();
                  if (error.status == 401 || error.status == 422 || error.status == 0) {
                    if (error.statusText == "Unauthorized") {
                      this.generalService.loginAgain();
                      this.modalCtrl.dismiss();
                      this.router.navigateByUrl("/opem");
                    }
                  }
                }
              )
            // this.popoverController.dismiss();
          }
        }
      ]
    });

    await alert.present();
    
  }
  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

  onChangeReason(val, student, studentData, i) {
    console.log(val.detail['value']);
    let set_mark;
    let set_grade;
    set_mark = null;
    set_grade = null;
    if(val.detail['value'] == '') {
      this.isDisable[i] = false;
      this.myForm.addControl('form'+i, new FormControl(''));
      this.myForm.get('form'+i).setValidators([Validators.required]);
      this.myForm.controls['form'+i].setValue(set_mark);
      this.myForm.get('form'+i).updateValueAndValidity();

      if(this.settings.enable_grade_column_in_internal_assessment_marks == 1) {
        this.myForm.addControl('grade'+i, new FormControl(''));
        this.myForm.get('grade'+i).setValidators([Validators.required]);
        this.myForm.controls['grade'+i].setValue(set_grade);
        this.myForm.get('grade'+i).updateValueAndValidity();
      }
      
      
    }else {
      this.isDisable[i] = true;
      this.myForm.get('form'+i).clearValidators();
      this.myForm.get('form'+i).updateValueAndValidity();
      if(this.settings.enable_grade_column_in_internal_assessment_marks == 1) {
        this.myForm.get('grade'+i).clearValidators();
        this.myForm.get('grade'+i).updateValueAndValidity();
      }
      // studentData.set_marks = set_mark;
      // studentData.set_grades = set_grade;
      // this.myForm.addControl('form'+i, new FormControl(''));
      // this.myForm.addControl('grade'+i, new FormControl(''));
    }

    var studentInternalMarks = { 

      "studentInternalMarks":[{ 
      
        "id": student.id, 
      
        "roll_no": student.roll_no, 
      
        "student_name": student.student_name, 
      
        "batch": student.batch, 
      
        "course_name": student.course_name, 
      
        "set_marks": set_mark, 
      
        "set_grades": set_grade, 
      
        "internal_marks_id": studentData.internal_marks_id, 
      
        "final_save": this.internalAssessment.final_save, 
      
        "ia_max": this.internalAssessment.ia_max, 
      
        "reason": val.detail['value'], 
      
        "freeze_from_date": studentData.freeze_from_date, 
      
        "freeze_from_date_expired": studentData.freeze_from_date_expired, 
      
        "isFreezed": studentData.isFreezed, 
      
        // "Mid Sem": 6, 
      
        // "quiz": 14, 
      
        // "Assignment": 10, 
      
        "total_marks": student.total_marks, 
      
        "internal_marks_convert_marks": student.internal_marks_convert_marks, 
      
        "non_convert_total_marks": student.non_convert_total_marks, 
      
        "ia_marks": student.ia_marks, 
      
        "studentInternalAssessmentPercentage": student.studentInternalAssessmentPercentage, 
      
        "internalAssessmentShortagePercentage": student.internalAssessmentShortagePercentage, 
      
        "internal_assessment_particular_id": this.internalAssessment.internal_assessment_particular_id, 
      
        "convert": this.internalAssessment.convert, 
      
        "iaconfig_id": this.internalAssessment.iaconfig_id, 
      
        "assessment_particulars": this.internalAssessment.assessment_particulars, 
      
        "max_marks": this.internalAssessment.max_marks, 
      
        "mcq": this.internalAssessment.mcq, 
      
        "allocated_faculty": this.internalAssessment.allocated_faculty, 
      
        "disabled_mcq_faculty": this.internalAssessment.disabled_mcq_faculty, 
      
        "exam_particular_id": this.internalAssessment.exam_particular_id, 
      
        "type": this.internalAssessment.type, 
      
        "name": this.internalAssessment.name, 
      
        "enable_association_student_activity_system": this.internalAssessment.enable_association_student_activity_system, 
      
        "no_entry": this.internalAssessment.no_entry 
      
      }] 
      
      };
      var t = setTimeout(function(){ 
        return true
     }, 3000);
     console.log(t)
     if(t) {
       this.authService.g_postt_fac(studentInternalMarks ,'teaching-staff/internal-assessment/internal-assessment-marks', this.token).subscribe(
         response => {
           console.log(response, 'sd');
           if(response.status) {
             this.generalService.showToast(response.message);
           }
         },(error) => {
           console.log(error);
           // this.generalService.loadingDismiss();
            if (error.status == 401 || error.status == 422 || error.status == 0) {
              if (error.statusText == "Unauthorized") {
                this.modalCtrl.dismiss();
                this.generalService.loginAgain();
                this.router.navigateByUrl("/opem");
              }
            }
         })
         console.log(studentInternalMarks);
     }


  }

}

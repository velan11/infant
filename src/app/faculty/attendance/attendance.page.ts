import { Component, OnInit, ViewChild, ViewChildren, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, IonContent } from '@ionic/angular';
import { empty } from 'rxjs';
import * as moment from 'moment';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';

class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  @ViewChild('refresh', {static: false})refresh ;

  Name:any;
  arr:any = [];
  facData:any;
  interval: any = [];
  inrval: any;
  interval_name: string = '';
  interval_list: any = [];
  disabled = false;

  f:any;
  PHour:any;
  value: number|any;
  classAny: any;
  subName: any;
  fromDate:any = new Date(new Date().setDate(new Date().getDate() - 4)).toISOString();
  displayFac:boolean = false;
  progressShow:boolean = false;
  TakenAttdance:any = [];
  attndDate:any =  new Date().toISOString();

  token: any;
  facId: any;
  displyRegulrList: any;
  setDate:any = new Date().toISOString();
  Show_Lhour:boolean;
  LectureHour:any;
  leacturHour:any = [];
  TotalHour:any = [];
  totalHour:any = 1;
  totHour:any=1;
  showTot:any =true;
  hide: boolean = true;
  getStudentList:any = [];
  studentList:any;
  displyDate:any;
  update: boolean;
  saveBtn: boolean;
  PushAbsent:any = [];
  pushEnable:boolean = true;
  allow_pop:boolean|any;
  realoadAbsent:any = [];
  trackAbsent:any = [];
  reload_student:any = [];
  chec:boolean;
  check2:boolean;
  virtual:boolean;
  virtual2:boolean;
  ShowProgrs: boolean = true;
  id:any;
  sub:any;
  spinerShow:boolean|any;
  searchTerm:any;
  err: any = '';

  Sub_type ={
    subject_type: "",
    id: "" // faculty_division_allocation_id
  }

  SaveAttadance:any = {
    presentStudents: [],
    absentees: [],
    attendanceEntry: {
      date: "", 
      interval: "" 
    },
    attendanceClass: { 
      institution_id: "", 
      academic_year_id: "", 
      attendance_entry: "" 
    },
    lateComers: [], 
    classType: null, 
    absentReasons: {} 
  };
  modal:any;

  UpdateData ={
    progressHur:"",
    Date:"",
    interval: ""
  }
  UpdateObj:any;

  UpdateAttdance:any= {
    presentStudents: [],
    absentees: [],
    attendanceEntry: {
      date: "", 
      interval: "" 
    },
    attendanceClass: { 
      institution_id: "", 
      academic_year_id: "", 
      attendance_entry: "" 
    },
    lateComers: [], 
    classType: null, 
    absentReasons: {} 
  }
  getAbsenties:any ={
  
    subject_type: "",  
    attendance_id: ""
  }
  // Jayashri.B
  getPresent :any= {
    subject_type: "",
    attendance_id: ""
  }
  updateModel:any;

  constructor(public route:ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public general: GeneralService,
    public toastController: ToastController,
    private datePipe: DatePipe)
  {
      this.classAny = "";
      this.subName = "";
      this.facData = JSON.parse(localStorage.getItem('myParam'));


      this.Sub_type.subject_type = this.facData.subject_type;
      this.Sub_type.id = this.facData.id;
      //console.log(this.f.class, 'sf');
      if(this.facData)
        this.displayFac = true;
      else
        this.displayFac = false;

      this.sub = this.route.params.subscribe(params => {
        this.id = params['s']; 
      });
      // console.log(this.sub);
      //this.FindUser();
      this.err = '';
  }

  ngOnInit() {
    this.token = localStorage.getItem("pas_faculty");
    // console.log(this.fromDate, 'sds')
    this.getInterval();
  }

  ionViewDidEnter(){
    this.classAny = "";
    this.subName = "";
    this.facData = JSON.parse(localStorage.getItem('myParam'));

    this.fromDate = new Date(this.facData.attendance_start_date).toISOString();

    console.log(this.facData, 'fsd')
    let setdate = this.datePipe.transform(this.setDate, 'yyyy-MM-dd');
    if(setdate >= this.facData.attendance_last_date) {
      this.setDate = new Date(new Date(this.facData.attendance_last_date).setDate(new Date(this.facData.attendance_last_date).getDate() - 1)).toISOString();
      this.attndDate = this.setDate;
    }
      
    setTimeout(() => {
      this.displayList(); 
      this.progressShow =true;
      this.displayFac = true;
    }, 100);
  
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params['s']; 
    // });
 
    //this.FindUser();
    this.load_studentList();
    // console.log(this.facData, 'Data');
  }

  ionViewWillEnter(){
    this.token = localStorage.getItem("pas_faculty");
    this.load_studentList();
  }

  /**** Interval Deatils ****/
  getInterval() {
    this.general.loadingPresent();
    this.authService.get_fac_t("teaching-staff/class-guide-attendance/intervals", this.token).subscribe(
      data => {
        console.log(data[0]);
        if(data.length != 0) {
          this.interval = data
          this.inrval = data[0].id
          this.interval_name = data[0].name;
        }

        this.general.loadingDismiss();
      })
  }

  intervalDetails(t) {
    console.log(this.inrval)
    let id = this.inrval;
   var interv = t.filter(function(intval) {
      return intval.id == id;
    })
    this.interval_name = interv[0].name;

    let i = this.interval_list.filter(function(v) {
      return v == id;
    })
    this.disabled = i.length != 0 ? true : false;
  }
  /*** End Interval ****/

  /**** New Attendace ****/

  GetNewAttdance() {
    if(this.getStudentList.length <= 0) {
      this.resentToast('No student are assigned.');
    }else {
      this.hide = false;
      this.displyDate = this.attndDate.split('T')[0];
      this.update =false;
      this.saveBtn =true;

      this.ShowProgrs = true;
        
        // setTimeout(() => {
        //   this.virtual = true;  
        // }, 100);
      this.load_studentList();
    }
  }

  /*** End New Attendace*/

  /***** Student List ****/

  load_studentList(){
    this.getStudentList = [];
    this.PushAbsent = [];
    this.realoadAbsent = [];
    this.reload_student = [];
    let date = this.datePipe.transform(this.attndDate, 'yyyy/MM/dd');
    let page = `teaching-staff/class-guide-attendance/faculty-assigned-students?course_id=${this.facData.course_id}&batch_id=${this.facData.batch_id}&institution_id=${this.facData.institution_id}&date=${date}&filter_for_students=${this.facData.filter_for_students}`;
    // let item = {
    //   "course_id" : this.facData.course_id, 
    //   "batch_id" : this.facData.batch_id, 
    //   "institution_id" : this.facData.institution_id, 
    //   "date" : date
    // }
    
    this.authService.get_fac_t(page, this.token)
        .subscribe(
          data => {
            console.log(data, 'ashok');
            this.studentList = data;
            this.reload_student = this.studentList;
            this.getStudentList = data;
            this.ShowProgrs = false;
            
          },
          (err: any) => {
            if(err.status == 401 || err.status == 422 || err.status == 0) {
              if(err.statusText == "Unauthorized") {
                this.general.loginAgain();
                this.router.navigateByUrl('/login');
              }
            }
            
          }
          
        );
  }
  /***** End Student List *****/

 /***** Attedance List *****/
  displayList(){
    this.TakenAttdance = [];
    this.Show_Lhour = false;
    console.log(this.datePipe.transform(this.attndDate, 'yyyy/MM/dd'));
    moment().format('hh:mm a');
    let date = this.datePipe.transform(this.attndDate, 'yyyy/MM/dd');
    let page = `teaching-staff/class-guide-attendance/faculty-attendances?course_id=${this.facData.course_id}&batch_id=${this.facData.batch_id}&institution_id=${this.facData.institution_id}&date=${date}&year_id=${this.facData.year_id}&academic_year_id=${this.facData.academic_year_id}`;
    // let item ={
    //   "institution_id" : this.facData.institution_id, 
    //   "year_id" : this.facData.year_id, 
    //   "academic_year_id" : this.facData.academic_year_id, 
    //   "course_id" :this.facData.course_id, 
    //   "batch_id" : this.facData.batch_id, 
    //   "date" : this.datePipe.transform(this.attndDate, 'yyyy/MM/dd')
    // }
    let i = [];
    this.authService.get_fac_t(page, this.token)
        .subscribe(
          data => {
            console.log(data);
            this.TakenAttdance = data.facultyAttendanceArray;
            this.facId = data.facultyId;
            this.PHour = data.progressiveHour;
            this.TakenAttdance.forEach(function(val) {
              i.push(val.interval_id);
            })
            console.log(this.PHour)
            this.interval_list = i;
            console.log(this.interval_list)
            let id = this.inrval
            let c = this.interval_list.filter(function(v) {
              return v == id;
            })
            this.disabled = c.length != 0 ? true : false;
          },
          (err: any) => {
            if(err.status === 401 || err.status === 422) {
              this.general.loginAgain();
              this.router.navigateByUrl('/login');
            }
          }
        );
  }


  // ************  Method for get User Detail *************

  FindUser(){
    this.authService.g_postt_fac('item', 'me', this.token).subscribe(
      data =>{
        let response = data; 
        this.Name = response.name;
        console.log(response,'me Data');
      }
    )
  }

  //Alert Message
  async resentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }

  // *************** back button handler **************
  back(){
    this.hide=true; 
    // this.check2 = false;
    // this.chec = false;
    console.log(this.getStudentList.length, 'hi');
    // if(this.getStudentList.length == 0) {
      
    // }
    this.getStudentList.push(...this.PushAbsent);
    this.reload_student.push(...this.PushAbsent);
    this.getStudentList.sort((a,b)=>{
      // return a.roll_no -b.roll_no;
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    });
    this.reload_student.sort((a,b)=>{
      // return a.roll_no-b.roll_no; 
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    })
    this.PushAbsent = [];
    this.realoadAbsent = [];
  }

  // ********* Method for add absent *************
  pushAbsent(s,i){
    this.PushAbsent.length;
    // console.log(i);
    // console.log(s, 'sds');
    // if(this.pushEnable){ 
      this.allow_pop = true;
      this.getStudentList.splice(i,1);
    // } else {
    //   this.getStudentList.splice(i,1);
    //   this.reload_student.splice(i,1);
    // }
    
    this.realoadAbsent.unshift(s);
    this.PushAbsent.unshift(s);
    this.PushAbsent.sort((a,b)=>{
      // return a.roll_no -b.roll_no;
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0; 
    });
    this.realoadAbsent.sort((a,b)=>{
      // return a.roll_no-b.roll_no; 
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    })
    
    this.getStudentList.length;
    console.log(this.getStudentList.length);
  }

  //************ Method for add student to present List   */
  pushPresent(s,b,indx){
    console.log(b);
    console.log(this.getStudentList, 'before');
    if(this.pushEnable){
      this.trackAbsent = [];
      this.allow_pop =false;
      this.PushAbsent.splice(indx,1);
    } else{
      this.PushAbsent.splice(indx,1);
      this.realoadAbsent.splice(indx,1);
    }
    console.log(this.pushEnable);
    console.log(this.getStudentList.length);
    this.getStudentList.unshift(b);
    //this.reload_student.unshift(b);   
    this.getStudentList.sort((a,b)=>{
      // return a.roll_no -b.roll_no;
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    })
    // this.reload_student.sort((a,b)=>{
    //   return a.roll_no -b.roll_no;
    // })
    this.getStudentList.length;
    console.log(this.getStudentList);
  }

  //******** Method for selecting all Student in present List ********
  // ********* called in checkbox **********
  selectAll(c){ 
    if(c == true){
      this.check2 = false;
    }
  }

  //******** Method for selecting all Student in Absent List ********
  // ********* called in checkbox **********
  selectAllabsent(c){
    if(c==true){
      this.chec= false;
    }
  }

  pushAll(){
    this.PushAbsent.push(...this.getStudentList);
    this.realoadAbsent.push(...this.getStudentList);
    this.PushAbsent.sort((a,b)=>{
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0; 
    });
    this.realoadAbsent.sort((a,b)=>{
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    })
    this.getStudentList = [];
    this.reload_student = [];
    this.virtual = false;
    this.virtual2 =true;
    this.chec = false;
  }

  pushpresentAll(){
    this.getStudentList.push(...this.PushAbsent);
    this.reload_student.push(...this.PushAbsent);
    this.getStudentList.sort((a,b)=>{
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    });
    this.reload_student.sort((a,b)=>{
      // return a.roll_no-b.roll_no; 
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    })

    this.PushAbsent = [];
    this.realoadAbsent = [];

    this.virtual =true;
    this.virtual2 =false;
    this.check2 = false;
  }

  // *************** method for reloading student after search fires **************
  IntiliazeItmes(){
    this.getStudentList = [];
    this.PushAbsent = [];
    let item;

    if(this.realoadAbsent.length > 0 && this.allow_pop) {
      this.realoadAbsent.map(item =>{
        for(let i in this.reload_student){  
          if(item.roll_no == this.reload_student[i].roll_no){
            var rr = this.reload_student.splice(i,1);
          }else {
            console.log('no matching found');
          }
             
        }
      });
    } 
    if(this.reload_student.length > 0 && !this.allow_pop ){
      this.reload_student.map(item =>{
        for(let i in this.realoadAbsent){
          if(item.roll_no ==  this.realoadAbsent[i].roll_no){
                 var abst = this.realoadAbsent.splice(i,1);
                 console.log('absent Found',abst);
          }else{
            console.log('No matching found in absent list')
          }
        }
 
      })
 
    }
    this.getStudentList.push(...this.reload_student);
    this.PushAbsent.push(...this.realoadAbsent);
    this.getStudentList.sort((a,b)=>{
      // return a.roll_no -b.roll_no;
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    })
    this.PushAbsent.sort((a,b)=>{
      // return a.roll_no -b.roll_no;
      if(a.student_full_name < b.student_full_name) { return -1; }
      if(a.student_full_name > b.student_full_name) { return 1; }
      return 0;
    })
    //return this.getStudentList || this.PushAbsent;
   //  console.log(this.getStudentList.length,'reload items len');
  }

  // ++++++++++++  Method for search student +++++++++++++
  getItems(et){
    //this.IntiliazeItmes;
    const val = et.target.value;
    if(val && val.trim() != ''){
      this.pushEnable = true;
      this.PushAbsent = this.PushAbsent.filter((item) => { 
        return (item.student_name.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.getStudentList =  this.getStudentList.filter((item) => { 
        return (item.student_name.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } 
    else {
      this.content.scrollToTop(400)
      this.pushEnable = false;
      // this.getStudentList = this.getStudentList;
      //this.load_studentList()
      this.IntiliazeItmes();
    }
  }

  // ************ Method for saving attendance ***********
  Save():any{
    this.chec =false;
    this.check2 =false;
    this.err = '';
    this.searchTerm = "";
    this.spinerShow = true;
    setTimeout(() => {
      this.spinerShow =false;
    }, 500);
    
    this.SaveAttadance.absentees=[];
    this.SaveAttadance.presentStudents = [];
    this.SaveAttadance.attendanceEntry.date =  this.displyDate;
    this.SaveAttadance.attendanceEntry.interval = this.inrval;
    this.SaveAttadance.attendanceClass.institution_id = this.facData.institution_id;
    this.SaveAttadance.attendanceClass.academic_year_id = this.facData.academic_year_id;
    this.SaveAttadance.attendanceClass.attendance_entry = 'New';
   
    setTimeout(() => {
      for(let i of this.getStudentList){
        // if(i.check == false){
        this.SaveAttadance.presentStudents.push(i.id);
        // }
      } 
      for(let i of this.PushAbsent){
        // if(i.check == true){ 
        this.SaveAttadance.absentees.push(i.id);
        // }
      }

      this.openModel();
      
    }, 1000);
  }

  // ************ Method for confirm save attendance ***********

  confirmSave(){
    console.log(this.SaveAttadance, 'save')
    this.authService.g_postt_fac(this.SaveAttadance, "teaching-staff/class-guide-attendance/save-attendance", this.token)
      .subscribe(
        data =>{
          this.resentToast('Saved successfully.');
          this.closeModel();
          this.displayList();
          this.back();
          this.err = '';
        },
        err => {
          this.err = err;
        }
      )
  }

  /***** Created Attendance Display */
  UpdateAttd(a){
    console.log(a);
    this.UpdateData.progressHur = a.progressive_hour;
    this.UpdateData.interval = a.interval_name;
    this.UpdateData.Date = a.date;
    this.displyDate = a.date;
    this.PHour = a.progressive_hour;
    this.totHour = a.total_hours;
    this.inrval = a.interval_id;
    this.interval_name = a.interval_name;
    this.UpdateObj = a;
    this.update =true;
    this.ShowProgrs = true;
    this.saveBtn =false;
    this.virtual =false;
    this.virtual2 =false;
    let absentId:any;
    this.getStudentList = [];
    this.reload_student = [];
    this.realoadAbsent = [];
    this.PushAbsent = [];
    let showList:any = [];
    let rlo_a:any = [];
    let rlo_s:any = [];

    let date = this.datePipe.transform(this.attndDate, 'yyyy/MM/dd');
    let page1 = `teaching-staff/class-guide-attendance/faculty-assigned-students?course_id=${this.facData.course_id}&batch_id=${this.facData.batch_id}&institution_id=${this.facData.institution_id}&date=${date}&filter_for_students=${this.facData.filter_for_students}`;
    
    this.authService.get_fac_t(page1, this.token)
        .subscribe(
          data => {
            console.log(data, 'Ashok');
            let element = data;
            element.forEach(element => {
              this.getStudentList.push({
                id:element.id,
                roll_no:element.roll_no,
                student_name:element.student_name,
                check:false
      
              });
              rlo_s.push({
                id:element.id,
                roll_no:element.roll_no,
                student_name:element.student_name,
                check:false
              })
            });

            /*** Absent Student Api ****/
            let page2 = `teaching-staff/class-guide-attendance/fetch-absentees?course_id=${this.facData.course_id}&batch_id=${this.facData.batch_id}&interval=${this.inrval}&date=${date}`;

            this.authService.get_fac_t(page2, this.token)
            .subscribe(
              data =>{
                let elemtnt:any = data;
                absentId = data;
                console.log(absentId, 'hi')
                if(absentId.length == 0){
                  showList.forEach(s => {
                    this.getStudentList.push({
                      id:s.id,
                      roll_no:s.roll_no,
                      student_name:s.student_name,
                      check:false
                    });
                    rlo_s.push({
                      id:s.id,
                      roll_no:s.roll_no,
                      student_name:s.student_name,
                      check:false
                    })
                    this.ShowProgrs = false;
                  })
                }
                for(let j in absentId){
                  for(let i in this.getStudentList){
                    if(this.getStudentList[i].id == absentId[j]){
                      this.PushAbsent.push(
                      { 
                        id:this.getStudentList[i].id,
                        student_name:this.getStudentList[i].student_name,
                        roll_no:this.getStudentList[i].roll_no,
                        check:true
                    
                      });
                      rlo_a.push({
                        id:this.getStudentList[i].id,
                        student_name:this.getStudentList[i].student_name,
                        roll_no:this.getStudentList[i].roll_no,
                        check:true
                      })
                      this.getStudentList.splice(i,1);
                      rlo_s.splice(i,1);
                    } 
                  }
                }
                this.reload_student = rlo_s;
                this.realoadAbsent =  rlo_a;
                this.ShowProgrs = false;
                this.virtual =true;
                console.log(this.PushAbsent)   
                this.virtual2 =true; 
              }
            );

          }
        );
        
  }

  //  ****************** api call of  Update Attadance ******** 
  UpdateSave(){
    this.chec =false;
    this.check2 =false;
    this.spinerShow = true;
    this.searchTerm = "";
    console.log(this.UpdateObj)

    this.UpdateAttdance.absentees = [];
    this.UpdateAttdance.presentStudents = [];
    this.UpdateAttdance.attendanceEntry.date =  this.UpdateObj.date;
    this.UpdateAttdance.attendanceEntry.interval = this.UpdateObj.interval_id;
    this.UpdateAttdance.attendanceClass.institution_id = this.facData.institution_id;
    this.UpdateAttdance.attendanceClass.academic_year_id = this.facData.academic_year_id;
    this.UpdateAttdance.attendanceClass.attendance_entry = 'Update';

   console.log(this.UpdateAttdance.attendanceEntry)
    setTimeout(() => {
      for(let i of this.getStudentList){
        this.UpdateAttdance.presentStudents.push(i.id);
      } 
      for(let i of this.PushAbsent){
        this.UpdateAttdance.absentees.push(i.id);
      }
      this.openUpdtModel();
      this.refresh;
    }, 1000);
  }

  // ********** Method For Confrim update Attedance ***********

  confirmUpdate(){
    console.log(this.UpdateAttdance, 'testig')
    this.authService.g_postt_fac(this.UpdateAttdance,"teaching-staff/class-guide-attendance/save-attendance", this.token ).subscribe(
      data =>{
        this.resentToast('Updated successfully.');
        this.closeUpdteModel();
        this.displayList();
        this.back();
        this.UpdateAttdance.absentees = [];
        this.UpdateAttdance.presentStudents = [];
      },
      err => {
        console.log(err);
      }
    )
  }

  // ********* Called in Menu Bar ****************
  navigateBack() {
    this.router.navigateByUrl('/homee');
  }

  //******** open confrimation model ********
  openModel(){
    this.modal= document.getElementById("myModal");
    this.modal.style.display = "block";
  }

  openUpdtModel(){
    this.updateModel = document.getElementById("UpdateModel");
    this.updateModel.style.display = "block";
    setTimeout(() => {
      this.spinerShow =false;
    }, 500);
    
  }

  // *********** close saving Model **********
  closeModel(){
    this. modal.style.display = "none";
  }

  // ********** close Updating Model **********
  closeUpdteModel(){
    this.updateModel.style.display = "none";
  }


  // ********** Method for View Attedance Statement ***********

  ViewStatemnt(){
    let date = this.attndDate.split('T')[0];
    localStorage.setItem('sheet',JSON.stringify(this.facData));
    localStorage.setItem('date',JSON.stringify(date));
    this.router.navigate(['attendance-statement']);
 
  }
  
  // ************** Method for View Attedance Sheet ************

  ViewSheet(){  
    this.router.navigate(['/view-attdance']);
  }
}
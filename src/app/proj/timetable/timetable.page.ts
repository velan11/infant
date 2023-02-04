import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {
  timetableData: any;
  token: any; err: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pager: false
  };
  isError = false;
  // @ViewChildren('mySlider') slides: IonSlides;

  @ViewChild("Slides", { static: true }) slides: IonSlides;
  // @ViewChild("mySlider", { static: true }) modalContent: TemplateRef<any>;

  constructor(private router: Router,
    public authService: AuthService,
    public generalts: GeneralService) { }
  // startSlide(data) {
  //   data.ionSlideReachStart();
  // }
  prev(data) {
    data.slidePrev()
    // data.slideEnd();
  }
  nnext(data) {
    // console.log("asdf", data)
    data.slideNext()

    // this.slides.slideNext()

    // this.mySlider.slideNext();

  }
  ngOnInit() {
  }
  ionViewWillEnter() {

    this.token = localStorage.getItem("pas_tok");
    // this.timetableData =
    // {
    //   "classTimeTable": {
    //     "Monday": [
    //       "Anatomy",
    //       "Physiology",
    //       "Physiology",
    //       "Nutrition",
    //       "Microbiology",
    //       "Kannada"
    //     ],
    //     "Tuesday": [
    //       "Anatomy",
    //       "Nutrition",
    //       "Microbiology",
    //       "Nursing Foundation",
    //       "English",
    //       null
    //     ],
    //     "Wednesday": [
    //       "Anatomy",
    //       "Nutrition",
    //       "Nursing Foundation",
    //       "English",
    //       "Psychology",
    //       null
    //     ],
    //     "Thursday": [
    //       "Physiology",
    //       "Biochemistry",
    //       null,
    //       null,
    //       null,
    //       null
    //     ],
    //     "Friday": [
    //       "Anatomy",
    //       "Nursing Foundation",
    //       null,
    //       null,
    //       null,
    //       null
    //     ],
    //     "Saturday": [
    //       "Nursing Foundation",
    //       null,
    //       null,
    //       null,
    //       null,
    //       null
    //     ],
    //     "Sunday": []
    //   },
    //   "classPeriodAndTime": {
    //     "1": "08:30 am to 09:30 am",
    //     "2": "09:30 am to 10:30 am",
    //     "3": "10:30 am to 11:30 am",
    //     "4": "11:30 am to 12:30 pm",
    //     "5": "01:30 pm to 02:30 pm",
    //     "6": "02:30 pm to 03:30 pm"
    //   }
    // }
    this.getNoticeValue();


    // var data = { "data": [{ "week_name": "MONDAY", "item": [{ "subName": "Kannada", "from_time": "11:30 AM", "end_time": "12:15 PM", "period_no": 1, "hrs": "11:30" }, { "subName": "Hindi", "from_time": "12:20 PM", "end_time": "01:05 PM", "period_no": 2, "hrs": "12:20" }] }, { "week_name": "TUESDAY", "item": [{ "subName": null, "from_time": "", "end_time": "", "period_no": 1, "hrs": "5:30" }, { "subName": null, "from_time": "", "end_time": "", "period_no": 2, "hrs": "5:30" }] }, { "week_name": "WEDNESDAY", "item": [{ "subName": "Environmental Studies", "from_time": "11:30 AM", "end_time": "12:15 PM", "period_no": 1, "hrs": "11:30" }, { "subName": "Art Education", "from_time": "12:20 PM", "end_time": "01:05 PM", "period_no": 2, "hrs": "12:20" }] }, { "week_name": "THURSDAY", "item": [{ "subName": null, "from_time": "", "end_time": "", "period_no": 1, "hrs": "5:30" }, { "subName": null, "from_time": "", "end_time": "", "period_no": 2, "hrs": "5:30" }] }, { "week_name": "FRIDAY", "item": [{ "subName": "Mathematics", "from_time": "11:30 AM", "end_time": "12:15 PM", "period_no": 1, "hrs": "11:30" }, { "subName": "English", "from_time": "12:20 PM", "end_time": "01:05 PM", "period_no": 2, "hrs": "12:20" }] }, { "week_name": "SATURDAY", "item": [{ "subName": null, "from_time": "", "end_time": "", "period_no": 1, "hrs": "5:30" }, { "subName": null, "from_time": "", "end_time": "", "period_no": 2, "hrs": "5:30" }] }, { "week_name": "SUNDAY", "item": [{ "subName": null, "from_time": "", "end_time": "", "period_no": 1, "hrs": "5:30" }, { "subName": null, "from_time": "", "end_time": "", "period_no": 2, "hrs": "5:30" }] }] }
  }


  async getNoticeValue() {
    const load = await this.generalts.loading("Loading ...");
    await load.present();

    var data = "";
    var c_stu = localStorage.getItem("c_stud");
    var link = "student/" + c_stu + "/class-timetable";
    // "student/" + c_stu + "/notices?type=Notices&paginate=0";
    console.log(link, "link", "this.c_stud ", c_stu);
    this.authService.g_get(data, link, this.token).subscribe(
      data => {
        load.dismiss();
        // if(data)
        this.timetableData = data;
        this.isError = false;
        console.log(data, "prof");
      },
      error => {
        load.dismiss();
        //console.error("Error!", error);
        console.log(this.isError)
        if (error.status == 401) {
          this.authService.loginAgain();
          //this.router.navigateByUrl('/login');
        } else if (error.status_code == 400) {
          console.log(error)
          this.err = error.message;
          this.isError = true;
        }
      }
    );
  }
}

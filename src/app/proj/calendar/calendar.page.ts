import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { endOfDay, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns/esm';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { CustomDateFormatter } from '../attendanc/custom-date-formatter.provider';

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3"
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF"
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA"
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarPage implements OnInit {
  token: any;
  err: any;
  calc: any = 1;
  currentMonth: any;
  dateMulti = [];
  dateMulti1 = [];
  absentData: any;
  asss: any;
  clic_date: any;
  tabl_data: false;
  absentDetails: any;
  string = "string";
  abs1: any;
  clicked_Date: boolean = false;
  lyt: boolean = false;
  keyValueCalendar = [];
  monthDAta: any;
  //////////////calender
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  columnFormat: {
    month: "ddd";
    week: "ddd d/M";
    day: "d ";
  };
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];


  activeDayIsOpen: boolean = true;
  changeMonth = new Date();
  keyValueCz = [];
  constructor(
    public generalts: GeneralService,
    public auth: AuthService,
    public datepipe: DatePipe,
    private modal: NgbModal,
    public alertController: AlertController
  ) { }

  ionViewWillEnter() {

    this.calc = 1;
    this.token = localStorage.getItem("pas_tok");
    console.log("afs");
    this.get_absent();

    // this.getNoticeValue();
    //this.generalts.gen_loading();

    this.events = [];

  }

  ngOnInit() { }

  onSelect(event) {
    this.clicked_Date = true;
    console.log("eventonSelect ", event);
    //var date = new Date(event.time);
    var date = new Date(event);
    var dateFormat = this.datepipe.transform(date, "yyyy-MM-dd");

    this.absentDetails = this.absentData[dateFormat];

    // return (this.dateMulti = this.dateMulti1);
    var dass = this.datepipe.transform(date, "yyyy ,MM ,dd");
    // this._daysConfig.push({
    //   cssClass: "holiday",
    //   date: new Date(dass),
    //   subTitle: "2",
    //   marked: true
    // });
    this.keyValueCz = this.absentDetails;
    console.log(
      this.absentDetails,
      "length",
      this.dateMulti,
      this.absentData,
      dateFormat
    );
  }

  monthchnge(event) {
    console.log(event, "event147", event.value);
    var currentMonth1 = event.newMonth;
    this.currentMonth = currentMonth1.months.toString();
    console.log(this.absentData);
  }
  sda() {
    console.log("event", this.dateMulti);
    //this.dateMulti = [];
  }

  async get_absent() {
    // const load = await this.generalts.loading("Loading ...");
    // await load.present();

    var stud = localStorage.getItem("c_stud");
    var data = "";
    //this.dateMulti = [];
    // setTimeout(() => {

    var data = "";
    var link = "student/" + stud + "/calendar";
    // if (month && year) {
    //   link = "student/" + stud + "/calendar?month=" + month + "&year=" + year;
    // }
    // var link =
    //   "student/" + stud + "/absent-info?from=2018-06-01&to=2022-12-12";
    //console.log(link, "link");
    this.lyt = false;
    const load = await this.generalts.loading("Loading ...");
    await load.present();
    this.auth.g_get(data, link, this.token).subscribe(
      absent => {
        this.lyt = true;
        load.dismiss();


        let arr;

        this.absentData = absent;
        // this.absentData = {
        //   "2019-07-03": [
        //     {
        //       "lecture_hour": 1,
        //       "subject_name": "18COM302 - Cost Accounting",
        //       "lecturer": "Ms. Alisha Mary Philip",
        //       "lecturer_mobile_number": null
        //     }
        //   ]
        // }

        //this.abs1=[];

        console.log(
          this.absentData,
          "given data RAWW",
          // startOfDay(new Date("2017/01/26"))
        );

        Object.keys(absent).forEach(element => {
          this.dateMulti.push(element.toString());
          this.dateMulti1.push(element.toString());

          // this.dateMulti.push(element);
          // console.log(this.dateMulti, "dat", this.events, "eventsevents123");
          // // this.dateMulti;
          // console.log(this.dateMulti, this.dateMulti1, "element");

          // console.log(this.dateMulti);
        });

        for (let index = 0; index < this.dateMulti.length; index++) {
          const element = this.dateMulti[index];
          this.keyValueCalendar.push({
            date: element,
            value: this.absentData[this.dateMulti[index]]
          })

          console.log(
            element,
            "elementdateMulti", this.keyValueCalendar, "this.keyValueCalendar",
            // this.absentData["2019-06-28"],
            new Date(this.keyValueCalendar[index]['date']).getMonth() + 1
            // this.absentData[this.dateMulti[index]]
          );
          // var dataSort = this.keyValueCalendar[index]['date'];
          // var monthz = this.changeMonth.getMonth() + 1;
          // var year = this.changeMonth.getFullYear();
          // if (new Date(dataSort).getMonth() + 1 == monthz && new Date(dataSort).getFullYear()) {
          //   this.keyValueC.push({
          //     date: element,
          //     value: this.absentData[this.dateMulti[index]]
          //   })
          // }

          let a = this.absentData[this.dateMulti[index]];
          if (a != undefined) {
            // console.log("ashok", typeof a, a.length);
            for (let index1 = 0; index1 < a.length; index1++) {
              const element = a[index1];
              console.log(this.dateMulti[index], "dsa");

              this.events.push({
                start: subDays(
                  startOfDay(new Date(this.dateMulti[index])),
                  0
                ),
                //  end: addDays(new Date(), 1),
                title: element,
                color: colors.blue,
                actions: this.actions,
                allDay: true,
                resizable: {
                  beforeStart: false,
                  afterEnd: false
                },
                draggable: false
              });
            }
          }

        }
        this.closeOpenMonthViewDay(this.changeMonth);

        console.log(this.events, this.dateMulti, "55555");

        return this.events;
      },
      error => {
        //   load.dismiss();
        console.error("Error!", error.status_code, error.message);
        if(error.status == 401 ) {
          this.auth.loginAgain();
          //this.router.navigateByUrl('/login');
        }else if (error.status_code == 400) {
          this.err = error.message;
        }
      }
    );
    // }, 500);
  }

  ////////////calender

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;

      console.log(this.viewDate, "viewDate");
      this.onSelect(this.viewDate);
      //this.presentAlertConfirm(this.viewDate);
    }
  }

  async presentAlertConfirm(date) {
    const alert = await this.alertController.create({
      header: "Absent Days!",
      message: "Message <strong>" + date + "</strong>!!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");
          }
        }
      ]
    });

    await alert.present();
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent("Dropped or resized", event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: "lg" });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: "New event",
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        //color: colors.red,
        cssClass: "asd",
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay(data) {
    this.changeMonth = data;
    var monthz = data.getMonth() + 1;
    var year = data.getFullYear();
    console.log(data, "month", monthz, year);
    // this.get_absent(monthz, year)
    this.getMonth(monthz, year);
    console.log(this.keyValueCalendar)

    this.activeDayIsOpen = false;
  }
  getMonth(month?, year?) {
    this.keyValueCz = [];
    console.log("getMonth", this.keyValueCalendar)
    for (let index = 0; index < this.keyValueCalendar.length; index++) {
      const element = this.keyValueCalendar[index];



      var dataSort = this.keyValueCalendar[index]['date'];

      var monthz = this.changeMonth.getMonth() + 1;
      var yeasr = this.changeMonth.getFullYear();

      // console.log(dataSort, new Date(dataSort).getMonth() + 1, new Date(dataSort).getFullYear(), "dataSort dataSort", yeasr, monthz, "res",
      //   new Date(dataSort).getMonth() + 1 == monthz && new Date(dataSort).getFullYear() == yeasr);
      console.log(element.value, "element123");

      for (let index = 0; index < element.value.length; index++) {
        const elementNew = element.value[index];
        console.log(elementNew.event, "element123NEw");
        if (new Date(dataSort).getMonth() + 1 == monthz && new Date(dataSort).getFullYear() == yeasr) {
          elementNew.date = dataSort;

          this.keyValueCz.push(
            elementNew
          )
        }
      }




      // }
    }
    return
    console.log(this.keyValueCalendar);
    var stud = localStorage.getItem("c_stud");
    var data = "";
    //this.dateMulti = [];
    // setTimeout(() => {

    var data = "";
    var link = "student/" + stud + "/calendar";
    if (month && year) {
      link = "student/" + stud + "/calendar?month=" + month + "&year=" + year;
    }
    // var link =
    //   "student/" + stud + "/absent-info?from=2018-06-01&to=2022-12-12";
    //console.log(link, "link");
    // this.lyt = false;

    this.auth.g_get(data, link, this.token).subscribe(
      Data => {
        console.log(Data, "Data month")
        this.monthDAta = Data;
        // this.da = absent;
      })
  }
  // async getNoticeValue() {
  //   const load = await this.generalts.loading("Loading ...");
  //   await load.present();

  //   var data = "";
  //   var c_stu = localStorage.getItem("c_stud");
  //   // var link = "student/" + c_stu + "/calendar";
  //   var link = "students"
  //   console.log(link, "link", "this.c_stud ", c_stu);
  //   this.auth.g_get(data, link, this.token).subscribe(
  //     data => {
  //       load.dismiss();
  //       // this.timetableData = data;
  //       console.log(data, "timetableData timetableData");
  //     },
  //     error => {
  //       load.dismiss();
  //       console.error("Error!", error.status_code, error.message);
  //       if (error.status_code == 400) {
  //         this.err = error.message;
  //       }
  //     }
  //   );
  // }


}
//   timetableData: any;
//   token: any; err: any;
//   constructor(private router: Router,
//     public authService: AuthService,
//     public generalts: GeneralService) { }

//   ngOnInit() {
//   }
//   ionViewWillEnter() {
//     this.token = localStorage.getItem("pas_tok");

//     // this.getNoticeValue();
//   }


// }

import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { AuthService } from "src/app/services/auth.service";
import { DatePipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import {
  CalendarView,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarEventAction,
  CalendarDateFormatter
} from "angular-calendar";
import { Subject } from "rxjs";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from "date-fns";
import { CustomDateFormatter } from "./custom-date-formatter.provider";
import { AlertController } from "@ionic/angular";
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
  selector: "app-attendanc",
  templateUrl: "./attendanc.page.html",
  styleUrls: ["./attendanc.page.scss"],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class AttendancPage implements OnInit {
  token: any;
  err: any;
  calc: any = 1;
  currentMonth: any;
  dateMulti = [""];
  dateMulti1 = [""];
  absentData: any;
  asss: any;
  clic_date: any;
  tabl_data: false;
  absentDetails: any;
  string = "string";
  abs1: any;
  clicked_Date: boolean = false;
  lyt: boolean = false;
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

  constructor(
    public generalts: GeneralService,
    public auth: AuthService,
    public datepipe: DatePipe,
    private modal: NgbModal,
    public alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.asss = "asdf";
    this.calc = 1;
    this.token = localStorage.getItem("pas_tok");
    console.log("afs");
    this.get_absent();
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
    var date = new Date();
    var dateFormat = this.datepipe.transform(date, "yyyy-MM-dd");
    var stud = localStorage.getItem("c_stud");
    var data = "";
    //this.dateMulti = [];
    // setTimeout(() => {
    // var link = "student/" + stud + "/absent-info?from=2018-06-01&to=" + dateFormat;
    var link = "student/" + stud + "/get-class-guide-attendance";
    console.log(link, "link");
    this.lyt = false;
    const load = await this.generalts.loading("Loading ...");
    await load.present();
    this.auth.g_get(data, link, this.token).subscribe(
      absent => {
        this.lyt = true;
        load.dismiss();
        console.log(absent.attendance['absent_dates_for_api'].split(","))
        
        this.absentData = absent.attendance['absent_dates_for_api'].split(",");
        this.absentData.forEach(val => {
          console.log(val)
          this.events.push({
            start: subDays(
              startOfDay(new Date(val)),
              0
            ),
            //  end: addDays(new Date(), 1),
            title: 'absent',
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

        )
        
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

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

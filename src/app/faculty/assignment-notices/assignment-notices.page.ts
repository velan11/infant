import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { GeneralService } from "src/app/services/general.service";
import { AssignmenteditPage } from "../assignmentedit/assignmentedit.page";

@Component({
  selector: "app-assignment-notices",
  templateUrl: "./assignment-notices.page.html",
  styleUrls: ["./assignment-notices.page.scss"],
})
export class AssignmentNoticesPage implements OnInit {
  assignID: any = "";
  token: any;
  listData: any = [];
  academicYearId: any = "";
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public general: GeneralService,
    public modalCtrl: ModalController 
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_faculty");

    this.assignID = JSON.parse(this.route.snapshot.paramMap.get("data")).id;
    this.academicYearId = JSON.parse(
      this.route.snapshot.paramMap.get("data")
    ).academic_year_id;

    console.log(
      JSON.parse(this.route.snapshot.paramMap.get("data")),
      "academicYearIdacademicYearId",
      this.academicYearId
    );
    this.LoadList();
  }
  edit(d) {
    this.router.navigate([
      "assignmentedit",
      {
        data: JSON.stringify(d),
        topic: "Edit Notices",
        facultyDivisionId: this.assignID,
        academicYearId: this.academicYearId,
      },
    ]);
  }
  async create() {
    // let a = {
    //       data: null,
    //       topic: "Add Notices",
    //       facultyDivisionId: this.assignID,
    //       academicYearId: this.academicYearId,
    //     };
    // const modal = await this.modalCtrl.create({
    //   component: AssignmenteditPage,
    //   componentProps: { assignment: a }

    // });

    // return await modal.present();
    this.router.navigate([
      "assignmentedit",
      {
        data: null,
        topic: "Add Notices",
        facultyDivisionId: this.assignID,
        academicYearId: this.academicYearId,
      },
    ]);
  }
  delete(d) {}
  async LoadList() {
    const load = await this.general.loading("Loading ...");
    load.present();
    let page =
      "teaching-staff/notices/get-notices?faculty_division_allocation_id=" +
      this.assignID;
    this.authService.get_fac_t(page, this.token).subscribe(
      (data) => {
        load.dismiss();
        console.log(data, "sd");
        this.listData = data;
      },
      (err: any) => {
        if (err.status == 401 || err.status == 422 || err.status == 0) {
          if (err.statusText == "Unauthorized") {
            this.general.loginAgain();
            this.router.navigateByUrl("/opem");
          }
        }
        load.dismiss();
      }
    );
  }
}

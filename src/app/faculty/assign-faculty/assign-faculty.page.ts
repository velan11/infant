import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-assign-faculty",
  templateUrl: "./assign-faculty.page.html",
  styleUrls: ["./assign-faculty.page.scss"],
})
export class AssignFacultyPage implements OnInit {
  token: any;
  SubjectData: any = [];
  FacSub_data = false;
  constructor(
    public loadingController: LoadingController,
    private router: Router,
    public authService: AuthService,
    public general: GeneralService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_faculty");

    this.loadSubjects();
  }
  action(data) {
    this.router.navigate([
      "assignment-notices",
      { data: JSON.stringify(data) },
    ]);
  }
  async loadSubjects() {
    const load = await this.general.loading("Loading ...");
    load.present();
    let page = "teaching-staff/faculty-subjects?employeeDetailId=undefined";
    this.authService.get_fac_t(page, this.token).subscribe(
      (data) => {
        load.dismiss();
        console.log(data, "sd");
        this.SubjectData = data.facultyElectiveSubjects;
        this.FacSub_data = true;
      },
      (err: any) => {
        if (err.status == 401 || err.status == 422 || err.status == 0) {
          if (err.statusText == "Unauthorized") {
            this.general.loginAgain();
            this.router.navigateByUrl("/opem");
          }
        }
        this.FacSub_data = true;
        load.dismiss();
      }
    );
  }
}

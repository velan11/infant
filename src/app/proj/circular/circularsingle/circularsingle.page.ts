import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-circularsingle',
  templateUrl: './circularsingle.page.html',
  styleUrls: ['./circularsingle.page.scss'],
})
export class CircularsinglePage implements OnInit {
  notice_id: any;
  token: any;
  err: any;
  noticeData: any;
  constructor(public activatedroute: ActivatedRoute,
    private router: Router,
    public authService: AuthService, private previewAnyFile: PreviewAnyFile,
    public generalts: GeneralService,
    private domSanitizer:DomSanitizer
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_tok");

    this.notice_id = this.activatedroute.snapshot.paramMap.get("notice_id");
    console.log("notice_id", this.notice_id);
    this.getNoticeValue();
  }
  fileopen(file) {
    console.log(file, "file");

    this.previewAnyFile.preview(file)
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));

    // const options: DocumentViewerOptions = {
    //   title: 'My PDF'
    // }

    // this.document.viewDocument(file, 'application/pdf', options)
  }

  html(d) {
    return this.domSanitizer.bypassSecurityTrustHtml(d);
  }

  async getNoticeValue() {
    const load = await this.generalts.loading("Loading ...");
    await load.present();

    var data = "";
    var c_stu = localStorage.getItem("c_stud");
    var link = "student/" + c_stu + "/notice/" + this.notice_id;
    // "student/" + c_stu + "/notices?type=Notices&paginate=0";
    console.log(link, "link", "this.c_stud ", c_stu);
    this.authService.g_get(data, link, this.token).subscribe(
      data => {
        load.dismiss();
        this.noticeData = data;
        console.log(data, "prof123");
      },
      error => {
        load.dismiss();
        console.error("Error!", error.status_code, error.message);
        if(error.status == 401 ) {
          this.authService.loginAgain();
          //this.router.navigateByUrl('/login');
        }else if (error.status_code == 400) {
          this.err = error.message;
        }
      }
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-noti-view",
  templateUrl: "./noti-view.page.html",
  styleUrls: ["./noti-view.page.scss"]
})
export class NotiViewPage implements OnInit {
  type: any;
  message: any;
  constructor(public activatedroute: ActivatedRoute) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.type = this.activatedroute.snapshot.paramMap.get("type");
    this.message = this.activatedroute.snapshot.paramMap.get("message");
    console.log("ionvierw", this.type, this.message);
  }
}

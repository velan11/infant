import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pay-report',
  templateUrl: './pay-report.page.html',
  styleUrls: ['./pay-report.page.scss'],
})
export class PayReportPage implements OnInit {

  @Input() message: string;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

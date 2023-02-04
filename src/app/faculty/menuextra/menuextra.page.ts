import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-menuextra',
  templateUrl: './menuextra.page.html',
  styleUrls: ['./menuextra.page.scss'],
})
export class MenuextraPage implements OnInit {

  constructor(public general: GeneralService) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.setItem('value', JSON.stringify(1));
    this.general.router.navigateByUrl('opem');
    this.general.popoverController.dismiss();
  }
  institute() {
    this.general.instituteClose();
  }

  password() {
    this.general.router.navigateByUrl('fac-password');
    this.general.popoverController.dismiss();
  }
}

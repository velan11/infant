import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-menupop',
  templateUrl: './menupop.page.html',
  styleUrls: ['./menupop.page.scss'],
})
export class MenupopPage implements OnInit {

  constructor(public general: GeneralService) { }

  ngOnInit() {
  }

  student() {
    this.general.instituteClose();
  }
  logout() {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.setItem('value', JSON.stringify(1));
    this.general.router.navigateByUrl('opem');
    this.general.popoverController.dismiss();
  }
  


  password() {
    this.general.router.navigateByUrl('change-password');
    this.general.popoverController.dismiss();
  }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch, GeneralService } from "src/app/services/general.service";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-fac-password',
  templateUrl: './fac-password.page.html',
  styleUrls: ['./fac-password.page.scss'],
})
export class FacPasswordPage implements OnInit {

  changeForm: FormGroup;
  submitted = false;
  mob: any;
  err: any;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    public generalts: GeneralService,
    public actroute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.changeForm = this.formBuilder.group(
      {
        oldpassword: ["", [Validators.required, Validators.minLength(6)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }
  
  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_faculty");
    
  }
   // convenience getter for easy access to form fields
   get f() {
    return this.changeForm.controls;
  }


  async onSubmit() {this.submitted = true;

    // stop here if form is invalid
    if (this.changeForm.invalid) {
      return;
    } else {
      //console.log(this.changeForm.value.confirmPassword, "reg"); 
      var pas = {
        "existingPassword": this.changeForm.value.oldpassword,
        "newPassword" : this.changeForm.value.password
      };
      
      console.log(pas);;
      this.generalts.loadingPresent()
      this.authService.g_postt_fac(pas, "teaching-staff/change-password", this.token)
      .subscribe(data => {
        console.log(data)
        let status = data.status;
        let message = data.message;
        this.generalts.showToast(message);
        if(status == 'success') {
          this.router.navigateByUrl('/dashboard');
          this.changeForm.reset();
        }
        this.generalts.loadingDismiss();
      },
      error => {
        this.generalts.loadingDismiss();
        console.error("Error!", error.status_code, error.message);
        if (error.status == 401) {
          this.authService.loginAgain();
          //this.router.navigateByUrl('/login');
        } else if (error.status_code == 400) {
          this.err = error.message;
        }
      });

    }

  }
}

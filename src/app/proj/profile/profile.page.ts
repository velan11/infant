import { Component, OnInit } from "@angular/core";
import { ActionSheetController, Platform } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AuthService } from "src/app/services/auth.service";
import { GeneralService } from "src/app/services/general.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  base64Image: any;
  userData: any;
  phone: any;
  email: any;
  profile_img = "";
  token:any;
  err:any;
  constructor(
    public actionSheetController: ActionSheetController,
    public platform: Platform,
    public camera: Camera,
    private router: Router,
    public authService: AuthService,
    public generalts: GeneralService
  ) {}
  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_tok");
    this.get_prof();
    // this.userData = JSON.parse(localStorage.getItem("profile"));
  //  console.log(this.userData, this.userData.student_name, "user");
    
    //
    // student_name: "FATHIMATH MASNA ANASS";
    // register_no: null;
    // joining_date: "2019-11-25";
    // dob: "1996-02-21";
    // institution_name: "St. Agnes College (Autonomous) - UG";
    // programme: "B.Com.";
    // combination: "B.Com.";
    // academic_year: "2019 - 2020";
    // academic_period: "SEMESTER V";
    console.log(this.phone, this.email, "userData");
  }

  async get_prof() {
    const load = await this.generalts.loading("Loading ...");
    await load.present();

    var data = "";
    var c_stu=localStorage.getItem("c_stud");
    var link = "student/" + c_stu + "/profile";
    console.log(link, "link", "this.c_stud ", c_stu);
    this.authService.g_get(data, link, this.token).subscribe(
      prof => {
        load.dismiss();
        localStorage.setItem("profile", JSON.stringify(prof));

        this.userData = prof['studentDetails'];
        console.log(prof, "prof1");
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

  logot() {
    localStorage.clear();
    this.router.navigate(["/opem"]);
  }
  ngOnInit() {}
  async profileimg() {
    let actionSheet = await this.actionSheetController.create({
      header: "Photo",
      cssClass: "action-sheets-basic-page",
      buttons: [
        {
          text: "Take photo",
          role: "destructive",
          icon: !this.platform.is("ios") ? "ios-camera" : null,
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: "Choose photo from Gallery",
          icon: !this.platform.is("ios") ? "ios-images" : null,
          handler: () => {
            this.openGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }
  openGallery() {
    //console.log("openGallery", this.id_partner);
    const options: CameraOptions = {
      quality: 50,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };

    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = "data:image/jpeg;base64," + imageData;
      console.log(this.base64Image, "base64Image");
      this.authService
        .postt(
          { image: this.base64Image, id: this.userData.phone },
          "imagez/profileimage_customer"
        )
        .subscribe(sa => {
          console.log(sa, "da");
        });
      //   this.authService
      //     .updateprofileimage_driver({
      //       image: this.base64Image
      //       //driver_id: this.driver_id
      //     })
      //     .then(result => {
      //       console.log(result, "kilid");
      //       // setTimeout(() => {
      //       //   // console.log("this.profileData()123");
      //       //   this.profileData();
      //       // }, 1500);
      //       setTimeout(() => {
      //         this.profileData();
      //       }, 1500);

      //       this.generalts.showToast("Image Uploaded Successfully");
      //     })
      //     .catch(err => {
      //       console.log(err, "errerr");
      //       this.generalts.showToast(err.message);
      //       console.log(err.message); // something bad happened
      //       return 123;
      //     });

      //   // this.profile_img.push(this.base64Image);
      //   // this.profile_img.reverse();
      // },
      // err => {
      //   // Handle error
    });
  }

  takePhoto() {
    //  console.log("Take Photo ", this.id_partner);
    const options: CameraOptions = {
      quality: 50, // picture quality
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(imageData => {
      let userData = JSON.parse(localStorage.getItem("userData"));
      // this.id_partner = userData.id;
      this.base64Image = "data:image/jpeg;base64," + imageData;
      console.log(this.base64Image, "base64Image");

      // this.authService
      //   .updateprofileimage_driver({
      //     image: this.base64Image,
      //     driver_id: this.driver_id
      //   })
      //   .then(result => {
      //     console.log(result, "kilid");
      //     // this.profileData();
      //     setTimeout(() => {
      //       this.profileData();
      //     }, 1500);

      //     this.generalts.showToast("Image Uploaded Successfully");
      //   })
      //   .catch(err => {
      //     console.log(err, "errerr");

      //     this.generalts.showToast(err.message);
      //     console.log(err.message); // something bad happened
      //     return 123;
      //   });
    });
  }

  async profileData() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let driverData = JSON.parse(localStorage.getItem("driverData"));

    const load = await this.generalts.loading("Loading ...");
    await load.present();

    //  this.presentLoadinga();
    // this.authservice.Driver_profile(this.driver_id).then(res => {
    //   load.dismiss();
    //   //this.loading1.dismiss();
    //   let data = res["response"][0];
    //   //console.log(data.profile_image, "data1231", res, JSON.stringify(res));

    // });
  }
}

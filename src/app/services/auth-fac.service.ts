import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthFacService {

  //Demo
  // base_path = "https://dev.pacifyca.com/stagnescollegestaging/api/v1/parent/";

  // base_path_faculty="https://dev.pacifyca.com/stagnescollegestaging/api/";

  //demo 1
  // base_path = " https://dev.pacifyca.com/pacifyca-v2/delwin/api/v1/parent/";

  // base_path_faculty = " https://dev.pacifyca.com/pacifyca-v2/delwin/api/";



  //germain high school Demo

  base_path = "https://dev.pacifyca.com/pacifyca-v2/school-demo/api/v1/parent/";
  base_path_faculty = "https://dev.pacifyca.com/pacifyca-v2/school-demo/api/";

  // Live
  // base_path = "https://online.stagnescollege.edu.in/api/v1/parent/";
  // base_path_faculty = "https://online.stagnescollege.edu.in/api/";

  constructor(private http: HttpClient,
    public router: Router,
    public alertController: AlertController) { }

  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json"
    })
  };




}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';

import { retry, catchError } from "rxjs/operators";
import { BehaviorSubject, throwError, Observable } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  base_path = "https://dev.pacifyca.com/ewallet/api/v1/";
  api_key = "1b656406-cad5-40e4-8f14-19fef71f7a3b";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "API-KEY": this.api_key
    })
  };
  constructor(
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  switch_to_ewallet_api(page, item): Observable<any> {
    console.log(page)
    return this.http
            .post(this.base_path + page, JSON.stringify(item),
            this.httpOptions
            )
  }

  get_data(page, token) {
    let f =  {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "API-KEY": this.api_key

      }).set("Authorization",token)
    };

    return this.http.get(this.base_path + page, f)
  }

  post_data(page, token, item) {
    let f =  {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "API-KEY": this.api_key

      }).set("Authorization",token)
    };
    console.log(page);
    return this.http.post(this.base_path + page, JSON.stringify(item), f)
  }
}

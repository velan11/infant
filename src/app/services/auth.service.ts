import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { retry, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  //infantjesusschool Demo

  // base_path = "https://dev.pacifyca.com/pacifyca-v2/school-demo/api/v1/parent/";
  // base_path_faculty = "https://dev.pacifyca.com/pacifyca-v2/school-demo/api/";


  // Live
  base_path = "https://infantjesusschool.pacifyca.com/api/v1/parent/";
  base_path_faculty = "https://infantjesusschool.pacifyca.com/api/";

  constructor(private http: HttpClient, public router: Router,
    public alertController: AlertController) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json"
    })
  };

  // Create a new item post
  createItem(item): Observable<any> {
    return this.http
      .post<any>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Create a  login post
  postt(item, page, fac_api?): Observable<any> {

    var lnk = ""
    lnk = (fac_api == undefined ? this.base_path : this.base_path_faculty);


    console.log(item, "postt", "linnk", lnk+page);

    return this.http
      .post(lnk + page, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Create a  token post
  g_postt(item, page, token): Observable<any> {
    console.log(item, "postt", token);

    // this.httpOptions.headers.append("Authorization", "Bearer " + token);
    console.log(this.base_path + page);
    return this.http
      .post(this.base_path + page, JSON.stringify(item), {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json"
        }).set("Authorization", "Bearer " + token)
      });
    // .pipe(retry(2), catchError(this.handleError));
  }

  g_postt_fac(item, page, token): Observable<any> {
    console.log(item, "g_postt_fac", token);
    // "institution-Id": '1',

    // this.httpOptions.headers.append("institution-Id", "Bearer " + token);
    let institute = localStorage.getItem("institute");
    if (!institute) {
      institute = "2"
    }
    return this.http
      .post(this.base_path_faculty + page, JSON.stringify(item), {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
          "Institution-Id": institute,
        }).set("Authorization", "Bearer " + token)
      })
      .pipe(retry(2), catchError(this.handleError));
  }


  get_fac_Institute(page, token): Observable<any> {
    //this.httpOptions.headers.append("Authorization", "Bearer " + token);
    let institute = localStorage.getItem("institute");
    console.log(this.base_path_faculty + page);
    console.log(institute, "instituteinstitute")
    let f = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Institution-Id": institute,
      }).set("Authorization", "Bearer " + token)
    };


    return this.http.get(this.base_path_faculty + page, f)
      .pipe(retry(2), catchError(this.handleError));
  }

  get_fac_t(page, token): Observable<any> {
    //this.httpOptions.headers.append("Authorization", "Bearer " + token);
    let institute = localStorage.getItem("institute");
    if (!institute) {
      institute = "2"
    }
    console.log(institute, "instituteinstitute")
    let f = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Institution-Id": institute,
      }).set("Authorization", "Bearer " + token)
    };
    console.log(this.base_path_faculty + page, f)

    // this.http.setDataSerializer('json');

    return this.http.get(this.base_path_faculty + page, f)
      .pipe(retry(2), catchError(this.handleError));
  }


  noti_scrol(page, token): Observable<any> {
    console.log("postt", token);

    this.httpOptions.headers.append("Authorization", "Bearer " + token);

    return this.http
      .get(page, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json"
        }).set("Authorization", "Bearer " + token)
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  // Create a  token PUT
  g_put(item, page, token): Observable<any> {
    console.log(item, "postt", token);

    this.httpOptions.headers.append("Authorization", "Bearer " + token);

    return this.http
      .put(this.base_path + page, JSON.stringify(item), {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json"
        }).set("Authorization", "Bearer " + token)
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  // Create a  token get
  g_get(data, page, token): Observable<any> {
    console.log("postt g_get", token);

    this.httpOptions.headers.append("Authorization", "Bearer " + token);
console.log(this.base_path + page);
    return this.http
      .get(this.base_path + page, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json"
        }).set("Authorization", "Bearer " + token)
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get single <any> data by ID
  getItem(id): Observable<any> {
    return this.http
      .get<any>(this.base_path + "/" + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get <any>s data
  getList(path): Observable<any> {
    return this.http
      .get<any>(this.base_path_faculty + path)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update item by id
  updateItem(id, item): Observable<any> {
    return this.http
      .put<any>(
        this.base_path + "/" + id,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<any>(this.base_path + "/" + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    // console.error("An error occurred:", error.error.message);
    // if (error.status === 400) {
    //   console.log(401, "4011", "An error occurred");
    //   return;
    // }
    // if (error.status === 401 || error.status == 401) {
    //   //|| error.status == "500"
    //   //alert("Unauthorised User!! Login Again!!");
    //   localStorage.clear();
    //   // redirect to the login route
    //   // or show a modal
    // }
    // if (error.status === 500 || error.status == 500) {
    //   //|| error.status == "500"
    //   alert("Something went wrong!! Login Again!!");
    //   localStorage.clear();
    //   //this.navCtrl.setRoot("FacLogoutPage");
    //   // redirect to the login route
    //   // or show a modal
    // }

    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error("An error occurred:", error.error.message, error.status);
    //   return throwError("error.error instanceof ErrorEvent");
    // } else
    if (error.status == 401) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log([404, 401].indexOf(error.status) > -1,
        `error.status != 400 Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
      localStorage.clear();



      // alert("Login again"); 
      // this.router.navigate(['/']); 
      return throwError(error);
      //"Something bad happened; please try again later"
    } else if (error.status == 405 || error.status == 404) {
      return throwError(error.error);
    } else if (error.status == 400) {
      return throwError(error.error);
    }
    // return an observable with a user-facing error message
    // return throwError("Something bad happened; please try again later.");
  }

  async loginAgain() {
    const alert = await this.alertController.create({
      header: 'Session Expired',
      // subHeader: 'Subtitle',
      message: 'Login Again',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.router.navigate(['/login']);
          console.log('Confirm Okay');
        }
      }]
    });

    await alert.present();
  }

  getData(type): Observable<any> {
    let factoken = localStorage.getItem("pas_faculty");
    console.log(factoken, 'Token check ')
    let herders = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    }).set("Authorization", "Bearer " + factoken);
    // console.log(herders);
    if (factoken != null) {
      let token_header = "Bearer " + factoken;
      console.log("type ", type);
      // console.log("key Value",keyval);
      //  let headers = new Headers();
      // headers.append("API-KEY", this.api_key);
      //  headers.append("Accept", "application/json");
      //  headers.append("Content-Type", "application/json"); // return this.http.get(apiUrl+ 'getState');
      //  headers.append("Authorization", token_header);

      let f = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json"
        }).set("Authorization", "Bearer " + factoken)
      };
      console.log(f);
      return this.http.get(this.base_path_faculty + type, f);
    }
  }

  postVersionDetails(urlExtension, item): Observable<any> {
    let api_url_extn = this.base_path + urlExtension;
    let headers = new Headers();
    return this.http
      .post(api_url_extn, JSON.stringify(item), {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json"
        })
      });
  }
}

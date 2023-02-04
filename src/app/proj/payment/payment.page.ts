import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import sha256 from 'crypto-js/sha256';
import hmac_sha256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { GeneralService } from 'src/app/services/general.service';
import { ModalController, Platform } from '@ionic/angular';
import { SuccessPage } from '../success/success.page';
import { PayReportPage } from '../pay-report/pay-report.page';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare var RazorpayCheckout:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  token: any;
  student_id: any;
  orders: any;
  logo: any;
  status = false;
  error: any;
  pdfObj = null;
  academicYearId: any;
  admissionFeesInStudentDashboard: any;
  isEnable = false;
  isError = false;
  constructor(public authService: AuthService,
    public gelService: GeneralService,
    private modalController: ModalController,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener) { 
      setTimeout(() => {
        this.intialData();
        console.log('sfsd');
      }, 2000);
    }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_tok");
    this.student_id = localStorage.getItem("c_stud");
   
    this.intialData();
                //console.log('Rupees ' + this.inWords(100000) + 'only');
    //console.log(this.exam_practicular)
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  intialData() {
    var data = '';
    var link = "student/" + this.student_id + "/get-challans";
    //console.log(examParticular.detail['value'])
    this.gelService.loadingPresent();
    this.authService.g_get(data, link, this.token)
                    .subscribe(data => {
                      console.log(data)
                      this.logo = data.logo;
                      this.admissionFeesInStudentDashboard = data.admissionFeesInStudentDashboard;
                      this.orders = data.challans;
                      this.academicYearId = data.academicYearId;
                      this.isError = false;
                      console.log(this.academicYearId );
                      this.gelService.loadingDismiss();
                    },  error => {
                      this.gelService.loadingDismiss();
                      console.log(error);
                      if(error.status == 401 ) {
                        this.authService.loginAgain();
                      }
                      else if (error.status_code == 400) {
                        this.error = error.message;
                        this.isError = true;
                        console.error("Error!", error);
                        //this.gelService.presentAlert_g(this.error);
                      }
                      else if(error.status_code == 404) {
                        this.error = error.message;
                        this.isError = true;
                      }
                      else{
                        this.gelService.presentAlert_g("Please check your Internet Connection");
                      }
                  })
  }

  generateOrder(order) {
    console.log(order)
    var item = {
      "challan_id": order.challan_id,
      "challan_type_id": order.challan_type_id,
      "amount": order.amount
    };
    console.log(this.token);
    var link = "student/" + this.student_id + "/create-order";
    this.gelService.loadingPresent();
    this.authService.g_postt(item, link, this.token)
                    .subscribe(data => {
                      this.gelService.loadingDismiss();
                      console.log(data);
                      var order_id = data.razorpayOrderId;
                      var secret = order.paymentKey;
                      var options = {
                        description: 'Online Payment',
                        image: this.logo,
                        order_id: data.razorpayOrderId,
                        currency: 'INR',
                        key: order.paymentKey,
                        amount: order.amount,
                        name: order.challan_type,
                        theme: {
                          color: '#620b23'
                            }
                        };
                        console.log(options, 'orders');
                        var successCallback = (success) => {
                          this.status = true;
                          console.log(success , 'success');
                          //alert('payment_id: ' + success.razorpay_payment_id)
                          var razorpay_payment_id = success;
                          this.isEnable = true;
                            var response = {
                              "orderId" : order_id,
                              "challanData" : {
                                "student_id" : order.student_id,
                                "challan_type_id" : order.challan_type_id, 
			                          "challan_id" : order.challan_id 
                              },
                              "paymentResponse" :  {
                                "razorpay_payment_id": razorpay_payment_id 
                              },
                              "isEnable": this.isEnable
                            }
                            this.paymentResponse(response);
                            console.log(success)
                            
                        }
                        var cancelCallback = (error) => {
                          console.log(error);
                          let errors = error.error;
                          this.gelService.presentAlert_g(errors.description);
                          this.isEnable = false;
                          // var response = {
                          //   'message':'',
                          //   'student_name': '',
                          //   'payment_id': '',
                          //   'payment_date': '',
                          //   'amount': '',
                          //   'status': '',
                          //   "isEnable": this.isEnable
                          // }
                          //this.openModal(response);
                        }
                          
                          RazorpayCheckout.open(options, successCallback, cancelCallback);
                          console.log(this.status)
    },  error => {
      this.gelService.loadingDismiss();
      if(error.status == 401 ) {
       
        this.authService.loginAgain();
        //this.router.navigateByUrl('/login');
      
      }
      else if (error.status == 400) {
        this.error = error.message;
        console.error("Error!", error.status_code, error.message);
        this.gelService.presentAlert_g(this.error);
      }
      else{
        console.log(error);
        
        this.gelService.presentAlert_g("Please check your Internet Connection1");
      }
    })
  }

   paymentResponse(response) {
    console.log(response, 'sdfd');
   var link1 = "student/" + this.student_id + "/payment-response";
   this.gelService.loadingPresent();
    this.authService.g_postt(response, link1, this.token)
                            .subscribe(resp => {
                              resp.isEnable = response.isEnable;
                              console.log(resp);
                              this.openModal(resp);
                              this.gelService.loadingDismiss();
                            },  error => {
                              this.gelService.loadingDismiss();
                              if(error.status == 401 ) {
                                this.authService.loginAgain();
                                //this.router.navigateByUrl('/login');
                              }
                              else if (error.status_code == 400) {
                                this.error = error.message;
                                console.error("Error!", error.status_code, error.message);
                                this.gelService.presentAlert_g(this.error);
                              }
                              else{
                                console.log(error)
                                this.gelService.presentAlert_g("Please check your Internet Connection2");
                              }
                          });
  }

async openModal(resp) {
  console.log(resp);
  const modal = await this.modalController.create({
    component: SuccessPage,
    cssClass: 'my-custom-class',
    componentProps: {
      'message': resp.message,
      'student_name': resp.student_name,
      'payment_id': resp.payment_id,
      'payment_date': resp.payment_date,
      'amount': resp.amount,
      'academicYearId':resp.academicYearId,
      'receipt_ids': resp.receipt_ids,
      'status': resp.status,
      'isEnable': resp.isEnable
    }
  });
  return await modal.present();
}

async generateReport(receipt_ids) {
  const logo = await this.getBase64ImageFromURL("../../assets/images/logo.jpeg");
  var link1 = "student/" + this.student_id + "/print-receipt";
  var data = {
    "ids": receipt_ids,
    "academic_year_id": this.academicYearId 
    
  }
  this.gelService.loadingPresent();
  this.authService.g_postt(data, link1, this.token)
  .subscribe(rsp => {
    console.log(rsp)
    var recieptDetails = rsp.receiptDetails
    var docDefinition;
    if(recieptDetails) {
      var item = rsp.receiptDetailsFeeItems[recieptDetails[0].receipt_id];
      var amt = 0;
      item.forEach(element => {
        amt = amt + element.amount;
      });
      console.log(amt);
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
      });

      var installment;
      if(recieptDetails[0].challan_description)
        installment = recieptDetails[0].challan_description;
      else
        installment = recieptDetails[0].installment;

      var student_details =  [
        [ 
          {text: "Receipt No.", fontSize: 12}, 
          {text: ': '+ (recieptDetails[0].receipt_number) ? recieptDetails[0].receipt_number : '', margin: [ -20, 0, 0, 0 ], fontSize: 12},
          {text: "Payment Date", margin: [ -20, 0, 0, 0 ], fontSize: 12},
          {text: ': '+ (recieptDetails[0].receipt_date) ? recieptDetails[0].receipt_date : '',  margin: [ -25, 0, 0, 0 ], fontSize: 12},
        ],
        [ 
          {text: "NAME", fontSize: 12}, 
          {text: ': '+ (recieptDetails[0].student_name) ? recieptDetails[0].student_name : '', margin: [ -20, 0, 0, 0 ], fontSize: 12},
          {text: "CLASS", margin: [ -20, 0, 0, 0 ], fontSize: 12},
          {text: ': '+ (recieptDetails[0].course_name) ? recieptDetails[0].course_name : '' + ' - ' + (recieptDetails[0].batch_name) ? recieptDetails[0].batch_name : '',  margin: [ -25, 0, 0, 0 ], fontSize: 12},
        ],
        [ 
          {text:  "Admission No.", fontSize: 12},
          {text: ': '+ (recieptDetails[0].admission_number) ? recieptDetails[0].admission_number : '', margin: [ -20, 0, 0, 0 ], fontSize: 12},
          {text: "Installment", margin: [ -20, 0, 0, 0 ], fontSize: 12},
          {text: ": " + (installment) ? installment : '',  margin: [ -25, 0, 0, 0 ], fontSize: 12}
        ],
        [ 
          {text: ""}, 
          {text: ''},
          {text: ""},
          {text: ""}
        ],
        [ 
          {text: ""}, 
          {text: ''},
          {text: ""},
          {text: ""}
        ],
        [ 
          {text: ""}, 
          {text: ''},
          {text: ""},
          {text: ""}
        ],
        [ 
          {text: "Total Paid Amount ", fontSize: 12}, 
          {text: ': '+ (amt) ? formatter.format(amt) : '', margin: [ -9, 0, 0, 0 ], fontSize: 12},
          {text: ""},
          {text: ""}
        ],
        [ 
          {text: "Mode of Payment", fontSize: 12}, 
          {text: ': ' + (recieptDetails[0].payment_type) ? recieptDetails[0].payment_type : '', margin: [ -9, 0, 0, 0 ], fontSize: 12},
          {text: ""},
          {text: ""}
        ],
        [ 
          {text:  "Amount in words", fontSize: 12},
          {text: ': Rupees ' + (amt) ? this.inWords(amt) +'only' : '', margin: [ -9, 0, 0, 0 ], fontSize: 12},
          {text: ""},
          {text: ""}
        ]
      ];
      docDefinition = {
          content: [
            {
              style: 'tableExample',
              table: {
                heights: [80, 120],
                widths: ['*'],
                body: [
                  [
                    {
                      columns: [
                        {
                            image: logo,
                            width: 70,
                            height: 80,
                        },
                        [
                          
                          {text: recieptDetails[0].header1, style: 'title'},
                          {text: recieptDetails[0].header2, style: 'sub_title'},
                          {text: recieptDetails[0].header3+ ' (Student Copy)', style: 'f_title'},
                        ],
                       
                      ]
                    },
                    
                  ],
                  [
                    {
                      margin: [ 0, 20, 0,10],
                      style: 'header',
                      layout: 'noBorders',
                      table: {
                        widths: ['*',230,80,70],
                        body: student_details
                      }
                    }
                    
                  ],
                  
                ]
              }
            }
          ],
          styles: {
            header: {
              fontSize: 9,
              //bold: true,
              margin: [0, 0, 10]
            },
            title: {
              bold: true,
              fontSize: 15,
              alignment: 'center',
              margin: [ -75, 10, 0, 0]
            },
            sub_title: {
              bold: true,
              fontSize: 12,
              alignment: 'center',
              margin: [ -75, 10, 0, 0]
            },
            f_title: {
              bold: true,
              fontSize: 10,
              alignment: 'center',
              margin: [ -75, 10, 0, 0]
            },
            footer_title: {
              bold: true,
              fontSize: 10,
              alignment: 'right'
            },
            tableExample: {
              margin: [0, 5, 0, 15]
            },
          }
        };
    
        this.pdfObj = pdfMake.createPdf(docDefinition);
        // this.pdfObj.open();
        if(this.plt.is('cordova')){
          this.pdfObj.getBuffer((buffer) => {
            var utf8 = new Uint8Array(buffer);
            var binaryArray = utf8.buffer;
            var blob = new Blob([binaryArray], { type: 'application/pdf'});
    
            this.file.writeFile(this.file.dataDirectory, 'PaymentReciept.pdf', blob, { replace: true }).then(fileEntry => {
              console.log(this.file.dataDirectory)
              this.fileOpener.open(this.file.dataDirectory + 'PaymentReciept.pdf', 'application/pdf');
            })
          })
        }else {
          this.pdfObj.open();
        }
    }
    this.gelService.loadingDismiss();
  
  },  error => {
    this.gelService.loadingDismiss();
    if(error.status == 401 ) {
      this.authService.loginAgain();
      //this.router.navigateByUrl('/login');
    }
    else if (error.status_code == 400) {
      this.error = error.message;
      console.error("Error!", error.status_code, error.message);
      this.gelService.presentAlert_g(this.error);
    }
    else{
      console.log(error)
      this.gelService.presentAlert_g("Please check your Internet Connection2");
    }
})
  
}

getBase64ImageFromURL(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = error => {
      reject(error);
    };
    img.src = url;
  });
}



inWords(num) {
    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    var n = [];
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' ' : '';
    return str;
}

}

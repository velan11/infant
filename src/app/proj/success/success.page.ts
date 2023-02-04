import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { AuthService } from 'src/app/services/auth.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  @Input() message: string;
  @Input() student_name: string;
  @Input() payment_id: string;
  @Input() payment_date: string;
  @Input() amount: string;
  @Input() status: string;
  @Input() isEnable: boolean;
  @Input() academicYearId: string;
  @Input() receipt_ids: string;
  token: any;
  student_id: any;
  error: any;
  pdfObj = null;
  
  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private router: Router,
    public gelService: GeneralService,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    public authService: AuthService
  ) { }
  

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_tok");
    this.student_id = localStorage.getItem("c_stud");
    var data = '';
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    
  }


  async generateReport() {
    const logo = await this.getBase64ImageFromURL("../../assets/images/logo.jpeg");
    var link1 = "student/" + this.student_id + "/print-receipt";
    var data = {
      "ids": this.receipt_ids,
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
            {text: ': '+ recieptDetails[0].receipt_number, margin: [ -20, 0, 0, 0 ], fontSize: 12},
            {text: "Payment Date", margin: [ -20, 0, 0, 0 ], fontSize: 12},
            {text: ': '+ recieptDetails[0].receipt_date,  margin: [ -25, 0, 0, 0 ], fontSize: 12},
          ],
          [ 
            {text: "NAME", fontSize: 12}, 
            {text: ': '+recieptDetails[0].student_name, margin: [ -20, 0, 0, 0 ], fontSize: 12},
            {text: "CLASS", margin: [ -20, 0, 0, 0 ], fontSize: 12},
            {text: ': '+recieptDetails[0].course_name + ' - ' + recieptDetails[0].batch_name,  margin: [ -25, 0, 0, 0 ], fontSize: 12},
          ],
          [ 
            {text:  "Admission No.", fontSize: 12},
            {text: ': '+recieptDetails[0].admission_number, margin: [ -20, 0, 0, 0 ], fontSize: 12},
            {text: "Installment", margin: [ -20, 0, 0, 0 ], fontSize: 12},
            {text: ": " + installment,  margin: [ -25, 0, 0, 0 ], fontSize: 12}
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
            {text: ': '+ formatter.format(amt), margin: [ -9, 0, 0, 0 ], fontSize: 12},
            {text: ""},
            {text: ""}
          ],
          [ 
            {text: "Mode of Payment", fontSize: 12}, 
            {text: ': ' + recieptDetails[0].payment_type, margin: [ -9, 0, 0, 0 ], fontSize: 12},
            {text: ""},
            {text: ""}
          ],
          [ 
            {text:  "Amount in words", fontSize: 12},
            {text: ': Rupees ' + this.inWords(amt) +'only', margin: [ -9, 0, 0, 0 ], fontSize: 12},
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
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
      return str;
  }

  back() {
    // this.gelService.loadingPresent();
    this.modalController.dismiss({
      'dismissed': true
    });
    this.router.navigateByUrl('/home');
    //this.gelService.loadingDismiss();
  }

}

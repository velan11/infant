import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-marks-list',
  templateUrl: './marks-list.page.html',
  styleUrls: ['./marks-list.page.scss'],
})
export class MarksListPage implements OnInit {
  token: any;
  student_id: any;
  exam_practicular: any;
  exam_type: any;
  examForm: FormGroup;
  isExamType = false;
  isMarks = false;
  marks: any;
  subjects: any;
  attendance: any;
  message = '';
  result: any;
  content: string;
  pdfObj = null;
  examList: any;error:any;
  constructor(public authService: AuthService,
    public formBuilder: FormBuilder,
    public gelService: GeneralService,
    private pdfGenerator: PDFGenerator,
    private plt: Platform,
      private file: File,
      private fileOpener: FileOpener
    //private inapp: InAppBrowser
    ) { }

  ngOnInit() {
    this.examForm = this.formBuilder .group({
      exam: ['', [Validators.required]],
      examType: ['', [Validators.required]]
    });
  }

  ionViewWillEnter() {
    this.token = localStorage.getItem("pas_tok");
    this.student_id = localStorage.getItem("c_stud");
    this.getMarksInfo();
    //console.log(this.exam_practicular)
  }

  // examParticular() {
  //   var data = '';
  //   var link = "student/" + this.student_id + "/assessment-particulars";
  //   console.log(link)
  //   this.gelService.loadingPresent();
  //   this.authService.g_get(data, link, this.token)
  //       .subscribe(
  //         data => {
  //           console.log(data)
  //           this.exam_practicular = data;
  //           this.gelService.loadingDismiss();
  //         }
  //       );
    
  // }

  getMarksInfo() {
    
    //this.isExamType = true;
    var data = '';
    var link = "student/" + this.student_id + "/assessment-particulars";
    //console.log(examParticular.detail['value'])
    this.gelService.loadingPresent();
    this.authService.g_get(data, link, this.token)
        .subscribe(
          data => {
            console.log(data)
            this.exam_type = data;
            this.gelService.loadingDismiss();
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
              
              this.gelService.presentAlert_g("Please check your Internet Connection");
            }
          }
        );

  }

  getProgressInfo(assessmentDeatils) {
    console.log(assessmentDeatils)
    var data = {
                  "assessment_particular_id" : assessmentDeatils.detail['value']
                };
    var link = "student/" + this.student_id + "/progress-report";
    console.log(link)
    this.gelService.loadingPresent();
    this.authService.g_postt(data, link, this.token)
    .subscribe(
      data => {
        console.log(data)
        if(data['marks'].length != 0) {
          this.marks = data['marks'];
          this.subjects = data['subjects'];
          this.attendance = data['attendance'].length == 0 ? '' : data['attendance'];
          //this.result = data['']
          this.examList = data['examList'];
          this.isMarks = true;
          this.message = '';
          console.log(this.attendance.length == 0);
        }else {
          this.isMarks = false;
          this.message = 'No Data Found'
          this.examList = '';
        }
        this.gelService.loadingDismiss();
        console.log(this.isMarks)
        
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
          
          this.gelService.presentAlert_g("Please check your Internet Connection");
        }
      }
    );

  }

  async downloadReport() {
  const logo = await this.getBase64ImageFromURL("../../assets/images/logo.jpeg");  
    var data = {
      "assessment_particular_id" : this.examForm.value['examType']
    };
    var link = "student/" + this.student_id + "/download-marks";
    this.gelService.loadingPresent();
    this.authService.g_postt(data, link, this.token)
    .subscribe(
      data => {
        console.log(data);
        var docDefinition;
        var examList = data['examList'];
        var academicYear = data['academicYear'];
        var downloadDate = data['downloadDate'];
        var institutionDetails = data['institutionDetails'];
        var studentDetails = data['studentDetails'];
        var marks = data['marks'];
        var totalMaxMarks = data['totalMaxMarks'];
        var totalMinMarks = data['totalMinMarks'];
        var totalObtainedMarks = data['totalObtainedMarks'];
        // const logo = await 
       //console.log(logo)
       //await 
        var i=1;
        var markslist = marks.map(function(item) {
          return [
            { text: i++, alignment: 'center' },
            { text: item['subject_name'],  },
            { text: item['max_marks'], alignment: 'center' },
            { text: item['min_marks'], alignment: 'center' },
            { text: item['reason'] ? item['reason'] : item['set_marks'], alignment: 'center' }
          ];
        });

        markslist.push(
          [
            { text: "TOTAL MARKS", colSpan: 2, aligments: 'center', bold: true, margin: [ 60, 0, 0,0]},
            {},
            { text: totalMaxMarks, alignment: 'center'},
            { text: totalMinMarks, alignment: 'center'},
            { text: totalObtainedMarks, alignment: 'center'},
          ]
        )

        var student_details =  [
          [ 
            {text: "NAME :", bold: true}, 
            {text: studentDetails['student_name'], bold: true, margin: [ -53, 0, 0, 0 ]},
            {text: "ADMISSION NO :", bold: true, margin: [ -1, 0, 0, 0 ]},
            {text: studentDetails['admission_number'], bold: true, margin: [ -16, 0, 0, 0 ]},
          ],
          [ 
            {text:  "CLASS & SEC  :", bold: true},
            {text: studentDetails['course_name']+' & '+ studentDetails['batch_name'], bold: true, margin: [ -20, 0, 0, 0 ]},
            {text: ""},
            {text: ""}
          ]
        ];

        markslist.unshift(
          [
            { text: '', colSpan: 2},
            { },
            { text: examList, colSpan: 3, alignment: 'center', bold: true },
            {},
            {}
          ],
          [
            { text: 'SL. No', alignment: 'center', bold: true },
            { text: 'SUBJECT',  alignment: 'center',  bold: true},
            { text:"MAX. MARKS", alignment: 'center',  bold: true },
            { text:"MIN. MARKS", alignment: 'center',  bold: true },
            { text:"OBTAINED MARKS", alignment: 'center',  bold: true }
          ]
        );
    docDefinition = {
      content: [
        {
          columns: [
            {
                image: logo,
                width: 70,
                height: 80,
                alignment: 'center'
            },
            [
              
              {text: institutionDetails['institution'].toUpperCase( ), style: 'title'},
              {text: institutionDetails['address'].toUpperCase( ), style: 'sub_title'},
              {text: institutionDetails['city'].toUpperCase( ), style: 'sub_title'},
              {text: 'Phone No. ' + institutionDetails['phone_number'], style: 'f_title'},
              {text: 'Email: ' + institutionDetails['email_address'], style: 'f_title'},
            ],
           
          ]
        },
        {
          margin: [ 0, 40, 0,10],
          layout: 'noBorders',
          //color: '#444',
          
          fontSize: 18,
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 400, 100],
    
            body: [
              [
                {text: 'PROGRESS REPORT - ' + academicYear, alignment: 'center', fontSize:13, bold: true, colSpan: 2},
                {}

              ]
              // [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
            ]
          }
        },
        {
          margin: [ 0, 20, 0,10],
          style: 'header',
          layout: 'noBorders',
          table: {
            widths: [80,280,80,50],
            headerRows: 1,
            body: student_details
          }
        },
        {
          
          style: 'header',
          //color: '#444',
          headerRows: 2,  
          table: {
            widths: [40, 150, 90, 90, 90],
            headerRows: 1,
            body: markslist
            
          }
        }
      ],
      styles: {
        header: {
          fontSize: 9,
          //bold: true,
          margin: [0, 0, 0, 10]
        },
        title: {
          bold: true,
          fontSize: 18,
          alignment: 'center',
          margin: [ -75, 0, 0,0]
        },
        sub_title: {
          bold: true,
          fontSize: 12,
          alignment: 'center',
          margin: [ -75, 0, 0,0]
        },
        f_title: {
          bold: true,
          fontSize: 10,
          alignment: 'center',
          margin: [ -75, 0, 0,0]
        },
        footer_title: {
          bold: true,
          fontSize: 10,
          alignment: 'right'
        }  
      }

    }

    this.pdfObj = pdfMake.createPdf(docDefinition);
    // this.pdfObj.open();
    if(this.plt.is('cordova')){
      this.pdfObj.getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer);
        var binaryArray = utf8.buffer;
        var blob = new Blob([binaryArray], { type: 'application/pdf'});

        this.file.writeFile(this.file.dataDirectory, 'ProgressCard.pdf', blob, { replace: true }).then(fileEntry => {
          console.log(this.file.dataDirectory)
          this.fileOpener.open(this.file.dataDirectory + 'ProgressCard.pdf', 'application/pdf');
        })
      })
    }else {
      this.pdfObj.open();
    }

    this.gelService.loadingDismiss();
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
          
          this.gelService.presentAlert_g("Please check your Internet Connection");
        }
      }
    )
    //this.inapp.create('https://www.irjet.net/archives/V4/i2/IRJET-V4I2413.pdf', '_system')
    //console.log(this.examForm.value['examType']);
    // this.content = "<h1>welcome</h1>";
    // let options = {
    //   documentSize: 'A4',
    //   type: 'share',
    //   // landscape: 'portrait',
    //   fileName: 'Order-Invoice.pdf'
    // };
    // this.pdfGenerator.fromData(this.content, options)
    //   .then((base64) => {
    //     console.log('OK', base64);
    //   }).catch((error) => {
    //     console.log('error', error);
    //   });
    
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

}

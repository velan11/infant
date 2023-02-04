import { Location } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { GeneralService } from "src/app/services/general.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import * as Quill from "quill";
import imageCompressor from "../../../assets/js/quill.imageCompressor.js";

// Quill.register("modules/imageCompress", imageCompressor);

import * as quill from 'quill';
import { ActionSheetController, IonContent } from "@ionic/angular";
// import { FileChooser } from "@ionic-native/file-chooser/ngx";
// import { FilePath } from "@ionic-native/file-path/ngx";
// import { Base64 } from "@ionic-native/base64/ngx";
import { DocumentViewer, DocumentViewerOptions } from "@ionic-native/document-viewer/ngx";
import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";

const Quill = quill as any;
// Use quill as normal...
Quill.register("modules/imageCompress", imageCompressor);

@Component({
  selector: "app-assignmentedit",
  templateUrl: "./assignmentedit.page.html",
  styleUrls: ["./assignmentedit.page.scss"],
})
export class AssignmenteditPage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  assignID: any = "";
  token: any;
  academicYearId: any;
  listData: any = [];
  typ;
  desc;
  tittl;
  headerr: any = null;
  editData: any;
  facultyDivisionId: any = "";
  textFormat: any = "";
  loadData: boolean = false;
  img = '';
  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote"],
      
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["video"],
      ["clean"], // remove formatting button
      ["link", "image", "code-block"] // link and image and code
    ],

    imageCompress: {
      quality: 0.5, // default
      maxWidth: 1000, // default
   imageType: "image/jpeg" // default
    },
  };
  document = [];
  isType = false;
  fileType: any = 'image';
  fileList: any = [];
  count = 0;
  changeForm: FormGroup;
  files: any; 
  indx = 1;
  removeFileId: any;
  hide = false;
  studentList: any;
  chec:boolean;
  selectedAll= false;
  selectStudentIds = [];
  sendAssign: boolean = false;
  searchTerm:any;
  students: any;
  s: any = [];
  isEdit: boolean = false;
  edits: boolean;
  studentId = [];

  checkStudents = [];
  @ViewChild('fileInput') fileInputClick: ElementRef;

  

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public location: Location,
    public authService: AuthService,
    public general: GeneralService,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public camera: Camera,

    // public fileChooser: FileChooser,
    // public filePath: FilePath,
    // public base64: Base64,
    private documents: DocumentViewer,
    private previewAnyFile: PreviewAnyFile
  ) {}

  ngOnInit() {
    this.changeForm = this.formBuilder.group(
      {
        type: ["", Validators.required],
        title: ["", Validators.required],
        desc: ["", Validators.required],
        fileType: [""],
       }
     
    );
    this.document = [];
    this.isEdit = false;
    this.edits = this.isEdit;
  }

  save() {
    console.log(this.textFormat, "fas");
  }

  submit() {
    console.log(this.typ, this.desc, this.tittl);
  }

  onEditorContentChange(sdfa) {
    console.log(sdfa, "sdfa.html",this.desc);
    
      this.desc = sdfa.html;
  }

  changedEditor(event) {
    console.log(event);
  }
  // update() {
  //   console.log(
  //     this.typ,
  //     this.desc,
  //     this.tittl,
  //     "123//",
  //     this.route.snapshot.paramMap.get("data"),
  //     "update data"
  //   );

  //   let dd = JSON.parse(this.route.snapshot.paramMap.get("data"));

  //   let notice = {
  //     notice: {
  //       type: "DOCS",
  //       title: this.tittl,
  //       content: this.desc,
  //       plugin_notices_type_id: this.typ,
  //     },
  //     // "documents[0]": [],
  //     academicYearId: this.academicYearId,
  //     facultyDivisionId: parseInt(this.facultyDivisionId),
  //   };
  //   this.general.loadingPresent();
  //   this.authService
  //     .g_postt_fac(notice, "teaching-staff/notices/update-notice", this.token)
  //     .subscribe(
  //       (data) => {
  //         let response = data;
  //         console.log(response, "me Data");
  //         this.general.loadingDismiss()
  //       },
  //       (error) => {
  //         alert(error);
  //         console.log(error);
  //         this.general.loadingDismiss()
  //       }
  //     );
  // }
  
  back() {
    this.location.back();
  }

  ionViewWillEnter() {
    this.document = [];
    this.removeFileId = '';
    this.token = localStorage.getItem("pas_faculty");
    this.LoadList();
    this.headerr = this.route.snapshot.paramMap.get("topic");
    this.facultyDivisionId =
      this.route.snapshot.paramMap.get("facultyDivisionId");
    this.academicYearId = this.route.snapshot.paramMap.get("academicYearId");
    console.log(
      this.facultyDivisionId,
      "academicYearId111",
      this.academicYearId
    );
    if (
      // [undefined, null, ""].indexOf(this.route.snapshot.paramMap.get("data")) >
      //   -1 &&
      this.headerr == "Edit Notices"
    ) {
      console.log(
        "getDatas45",
        JSON.parse(this.route.snapshot.paramMap.get("data"))
      );

      this.assignID = JSON.parse(
        this.route.snapshot.paramMap.get("data")
      ).plugin_notice_id;
      this.getDatas();
    }
  }

  async getDatas() {
    this.isEdit = true;
    this.edits = this.isEdit;
    const load = await this.general.loading("Loading ...");
    load.present();
    let page = "teaching-staff/notices/edit-notice?notice_id=" + this.assignID;
    this.authService.get_fac_t(page, this.token).subscribe(
      (data) => {
        load.dismiss();
        console.log(data, "getDatas");
        let editData = data.notice;
        this.files = data.files.length != 0 ? data.files : '';
        this.tittl = editData.title;
        this.desc = editData.content;
        // this.listData = data;
        this.typ = editData.plugin_notices_type_id;
        this.changeForm.patchValue({
          title: editData.title,
          type: editData.plugin_notices_type_id,
          desc: editData.content
        });
        let a = data.studentIds;
        // a.forEach(v => {
        //   this.studentId.push()
        // })
        this.studentId = a;
        this.selectStudentIds = this.studentId;
        console.log(this.studentId)
      },
      (err: any) => {
        if (err.status == 401 || err.status == 422 || err.status == 0) {
          if (err.statusText == "Unauthorized") {
            this.general.loginAgain();
            this.router.navigateByUrl("/opem");
          }
        }
        load.dismiss();
      }
    );
  }

  async LoadList() {
    const load = await this.general.loading("Loading ...");
    load.present();
    let page = "teaching-staff/notices/get-notices-types";
    this.authService.get_fac_t(page, this.token).subscribe(
      (data) => {
        load.dismiss();
        this.loadData = true;
        console.log(data, "sd");
        this.listData = data;
        if(this.listData.length != 0) {
          let v = this.listData[0];
          console.log(v['id']);
          this.changeForm.patchValue({ 
            type: v['id']
          });
        }
        console.log(this.changeForm)
      },
      (err: any) => {
        console.log(err.status, "err");
        if (err.status == 401 || err.status == 422 || err.status == 0) {
          if (err.statusText == "Unauthorized") {
            this.general.loginAgain();
            this.router.navigateByUrl("/opem");
          }
        } else {
          alert("server issue");
        }
        load.dismiss();
      }
    );
  }

  edit() {
    console.log(
      this.typ,
      this.desc,
      this.tittl,
      "123//",
      this.route.snapshot.paramMap.get("data"),
      "update data"
    );

    let dd = JSON.parse(this.route.snapshot.paramMap.get("data"));
    console.log("dd.academic_year_id,", this.academicYearId);

    this.selectStudentIds.forEach(v => {
      console.log({'id':v}, 'ad')
      this.s.push({'id': v});
    })
    let notice = {
      notice: {
        type: "DOCS",

        title: this.changeForm.value.title,

        content: this.changeForm.value.desc,

        plugin_notices_type_id: this.changeForm.value.type,
        plugin_notice_id: this.assignID,

        notice_to: "STUDENTS",

        notice_type: "PERMANENT",

        academic_year_id: this.academicYearId,

        selectedStudents : this.s
      },

      academicYearId: parseInt(this.academicYearId),

      facultyDivisionId: parseInt(this.facultyDivisionId),
      removedAttachementIds: this.removeFileId,

      documents: this.document
      
    };
    console.log(notice);
    this.general.loadingPresent();
    this.authService
      .g_postt_fac(notice, "teaching-staff/notices/update-notice", this.token)
      .subscribe(
        (data) => {
          let response = data;
          console.log(response, "me Data");
          this.location.back();
          this.general.loadingDismiss();
        },
        (error) => {
          console.log(error);
          this.general.loadingDismiss();
          if (error.status == 401 || error.status == 422 || error.status == 0) {
            if (error.statusText == "Unauthorized") {
              this.general.loginAgain();
              this.router.navigateByUrl("/opem");
            }
          }
        }
      );
  }

  async uploadFile() {
    const options: CameraOptions = {
      quality: 50,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      targetWidth: 2732,
      targetHeight: 2732,
      
    };

    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = "data:image/jpeg;base64," + imageData;
      console.log(base64Image);
      this.document.push(base64Image);
      if(this.fileList.length == '0') {
        this.count = 1;
      }else {
        ++this.count;
      }
      let file = {
        fileId : this.count,
        fileType: this.fileType,
        fileName: '',
        base64: base64Image
      };
      this.fileList.push(file)
    }
    ).catch((error: any) => console.error(error));

    console.log(this.fileList,this.count, 'ashok')
  }

  onFileChange(event) {
    console.log(event.target.files.length)
    var filename = event.target.files[0].name
    console.log("File Name")
    console.log(filename)
    var fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0])
    fileReader.onload = () => {
      console.log(fileReader.result, 'FG')
      this.document.push(fileReader.result)
      if(this.fileList.length == '0') {
        this.count = 1;
      }else {
        ++this.count;
      }
      let file = {
        fileId : this.count,
        fileType: this.fileType,
        fileName: filename,
        base64: fileReader.result
      };
      this.fileList.push(file)
      
     // here this method will return base64 string enjoy 
  }
  
  console.log(this.fileList, 'ashok')
}

getFile() {
  console.log('dsfd')
  document.getElementById('fileInput').click();
}

changeValue(fileType) {
  console.log(fileType)
  if(fileType == 'image')
    this.isType = false;
  if(fileType == 'file')
    this.isType = true;
}
  

  create() {
    if (this.changeForm.invalid) {
      console.log('invalid')
    } else {
    console.log(this.changeForm.value , "this.typ,");
    let dd = JSON.parse(this.route.snapshot.paramMap.get("data"));
    console.log("dd.academic_year_id,", this.academicYearId);

    console.log(this.document)
    
    this.selectStudentIds.forEach(v => {
      console.log({'id':v}, 'ad')
      this.s.push({'id': v});
    })
    let notice = {
      notice: {
        type: "DOCS",

        title: this.changeForm.value.title,

        content: this.changeForm.value.desc,

        plugin_notices_type_id: this.changeForm.value.type,
        selectedStudents : this.s
      },

      academicYearId: parseInt(this.academicYearId),

      facultyDivisionId: parseInt(this.facultyDivisionId),

      documents: this.document,
      

      // documents: [
      //   // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADZCAYAAACtvpV",
      //   // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADZCAYAAACtvpV",
      // ],
    };
    console.log(notice);
    //dev.pacifyca.com/pacifyca-v2/school-demo/api/teaching-staff/notices/save-notice
    //dev.pacifyca.com/pacifyca-v2/school-demo/api/teaching-staff/notices/save-notice
    this.general.loadingPresent();
    this.authService
      .g_postt_fac(notice, "teaching-staff/notices/save-notice", this.token)
      .subscribe(
        (data) => {
          let response = data;
          // this.router.navigate(["/assign-faculty"]);
          this.location.back();
          console.log(response, "me Data");
          this.general.loadingDismiss();
        },
        (error) => {
          console.log(error);
          this.general.loadingDismiss();
          if (error.status == 401 || error.status == 422 || error.status == 0) {
            if (error.statusText == "Unauthorized") {
              this.general.loginAgain();
              this.router.navigateByUrl("/opem");
            }
          }
        }
      );
    }
    
   
  }
  
  removeFile(id) {
    console.log(id)
    this.fileList.splice(id, 1);
    console.log(this.fileList)
    this.document = [];
    this.fileList.forEach(element => {
      this.document.push(element.base64)
    });
  }

  removeUFile(i, file_id) {
    console.log(file_id)
    this.files.splice(i, 1);
    this.removeFileId = (this.removeFileId) ? this.removeFileId + ',' + file_id : file_id;
  }

  viewDocument(file) {
    // 
    this.previewAnyFile.preview(file.name)
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error))
  }
  viewDocument1(a) {
    window.open(a.base64);
  }
  
  continue() {
    this.hide = true;
    let a = [];
    let page = "teaching-staff/notices/students?faculty_division_allocation_id="+this.facultyDivisionId;

    this.general.loadingPresent();
    this.authService.get_fac_t(page, this.token).subscribe(
      (data) => {
        console.log(data)
        let v = [];
        this.studentList = data;
        this.students = this.studentList;
        this.students.forEach(s => {
          v[s.id] = false;
        })
        //console.log(v);
        this.checkStudents = v;
        if(this.isEdit) {
          console.log(this.studentId)
          let i = 0;
          this.studentId.forEach(s => {
            this.checkStudents[s] = true;
            i++;
          })
          if(i === this.students.length) 
            this.chec = true;
          else
            this.chec = false;
          console.log(i,this.students.length, this.checkStudents, 'edit');
          //this.studentId = a;
        }
        this.general.loadingDismiss();
      },(error) => {
        console.log(error);
        this.general.loadingDismiss();
        if (error.status == 401 || error.status == 422 || error.status == 0) {
          if (error.statusText == "Unauthorized") {
            this.general.loginAgain();
            this.router.navigateByUrl("/opem");
          }
        }
      });

    
  }

  selectAll(c) {
    console.log(c);
    let a = [];
    if (c == true) {
      this.selectedAll = true;
      
      
      // if(this.edits) {
      //   this.isEdit = false;
      //   this.sendAssign = true;
      // }
      // console.log(this.items);
    } else {
      this.selectedAll = false;
      // if(this.edits) {
      //   this.isEdit = true;
      //   this.sendAssign = false;
      // }
      
      // this.postAssignmnet.selectStudentIds = [];
    }
    Object.keys(this.checkStudents).forEach(s => {
      a[s] = c;
    });
    this.checkStudents = a;

    console.log(this.checkStudents,'ashok')
  }

  getStudent(id, event) {
    console.log(this.selectAll, 'df')
    console.log(event.detail, 'sd')
    // if(event.detail['checked'] == true) {
      if (this.selectStudentIds.indexOf(id) == -1) {
        this.selectStudentIds.push(id);
      }
    // }
    
    if(event.detail['checked'] == false) {
      const index: number = this.selectStudentIds.indexOf(id);
      if (index !== -1) {
        this.selectStudentIds.splice(index, 1);
      }
    }
    
    if (this.selectStudentIds.length > 0) {
      this.sendAssign = true;
    } else {
      this.sendAssign = false;
    }
    console.log(this.selectStudentIds);
  } 
  

  getItems(et){
    //this.IntiliazeItmes;
    
    const val = et.target.value;
    console.log(val)
    if(val && val.trim() != ''){
    
      this.studentList =  this.students.filter((item) => { 
        return (item.student_name.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } 
    else {
      console.log(this.students)
      this.content.scrollToTop(400)
      this.studentList = this.students;
      //this.pushEnable = false;
      // this.getStudentList = this.getStudentList;
      //this.load_studentList()
     // this.IntiliazeItmes();
    }
  }
}

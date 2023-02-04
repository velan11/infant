import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AssignmenteditPageRoutingModule } from "./assignmentedit-routing.module";

import { AssignmenteditPage } from "./assignmentedit.page";
import { QuillModule } from "ngx-quill";
// Quill.register('modules/imageCompress', ImageCompress);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    // QuillModule.forRoot({
    //   modules: {
    //     syntax: false,
    //     toolbar: [
    //       ["bold", "italic", "underline"],
    //       [{ list: "bullet" }],
    //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //       [{ font: [] }],
    //       [{ align: [] }],
    //     ],
    //   },
    // }),
    QuillModule.forRoot({
      modules: {
        syntax: false,
        // imageCompress: {
        //   quality: 0.5, // default
        //   maxWidth: 1000, // default
        //   maxHeight: 1000, // default
        //   imageType: "image/jpeg", // default
        //   debug: true, // default
        // },
      },
    }),
    AssignmenteditPageRoutingModule,
  ],
  declarations: [AssignmenteditPage],
})
export class AssignmenteditPageModule {}

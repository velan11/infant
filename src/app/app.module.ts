import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PopComponent } from "./proj/pop/pop.component";
import { HttpClientModule } from "@angular/common/http";
import { Camera } from "@ionic-native/camera/ngx";
import { Network } from "@ionic-native/network/ngx";
import { DatePipe } from "@angular/common";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicStorageModule } from '@ionic/storage';
import { MenuextraPageModule } from "./faculty/menuextra/menuextra.module";
import { Firebase } from '@ionic-native/firebase/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { Market } from '@ionic-native/market/ngx';
import { QuillModule } from 'ngx-quill';
import { DataTablesModule } from "angular-datatables";
import { MenuPage } from "./faculty/menu/menu.page";

@NgModule({
  declarations: [AppComponent, PopComponent, MenuPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule, MenuextraPageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    DataTablesModule
    
    //InAppBrowser
  ],
  providers: [
    StatusBar,
    DatePipe,
    SplashScreen, PreviewAnyFile,
    Firebase,
    Network,
    Camera, DocumentViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SocialSharing,
    BarcodeScanner,
    Crop,
    File,
    FileOpener,
    FilePath,
    FileChooser,
    Base64,
    PDFGenerator,
    Market
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//comment last

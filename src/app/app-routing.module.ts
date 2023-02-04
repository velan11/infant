import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AaaGuard } from "../auth/aaa.guard";
import { OpemPage } from './logger/opem/opem.page';

const routes: Routes = [
  { path: "", redirectTo: "opem", pathMatch: "full" },
  // { path: "**", redirectTo: "home" }, pathMatch: "full"
  //{ path: '**', component: OpemPage },

  {
    path: "opem",
    loadChildren: () =>
      import("./logger/opem/opem.module").then(m => m.OpemPageModule)
    //,canActivate: [AaaGuard]

  }, {
    path: "home",
    loadChildren: () =>
      import("./proj/home/home.module").then(m => m.HomePageModule),
    canActivate: [AaaGuard]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./logger/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./proj/profile/profile.module").then(m => m.ProfilePageModule),
    canActivate: [AaaGuard]
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./logger/signup/signup.module").then(m => m.SignupPageModule)
  },

  {
    path: "otpcheck",
    loadChildren: () =>
      import("./logger/otpcheck/otpcheck.module").then(
        m => m.OtpcheckPageModule
      )
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./proj/contact/contact.module").then(m => m.ContactPageModule),
    canActivate: [AaaGuard]
  },

  {
    path: "password",
    loadChildren: () =>
      import("./proj/password/password.module").then(m => m.PasswordPageModule)

  },
  {
    path: "noti",
    loadChildren: () =>
      import("./proj/noti/noti.module").then(m => m.NotiPageModule)
  },
  {
    path: "attendanc",
    loadChildren: () =>
      import("./proj/attendanc/attendanc.module").then(
        m => m.AttendancPageModule
      )
  },
  {
    path: 'noti-view',
    loadChildren: () => import('./proj/noti-view/noti-view.module').then(m => m.NotiViewPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'homee',
    loadChildren: () => import('./faculty/home/home.module').then(m => m.HomePageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'attendance',
    loadChildren: () => import('./faculty/attendance/attendance.module').then(m => m.AttendancePageModule)
  },
  {
    path: 'view-attdance',
    loadChildren: () => import('./faculty/view-attendance/view-attendance.module').then(m => m.ViewAttendancePageModule),
  },
  {
    path: 'attendance-statement',
    loadChildren: () => import('./faculty/attendance-statement/attendance-statement.module').then(m => m.AttendanceStatementPageModule)
  },

  {
    path: 'menuextra',
    loadChildren: () => import('./faculty/menuextra/menuextra.module').then(m => m.MenuextraPageModule)
  },
  {
    path: 'circular',
    loadChildren: () => import('./proj/circular/circular.module').then(m => m.CircularPageModule)
  },
  {
    path: 'circularsingle',
    loadChildren: () => import('./proj/circular/circularsingle/circularsingle.module').then(m => m.CircularsinglePageModule)
  },
  {
    path: 'timetable',
    loadChildren: () => import('./proj/timetable/timetable.module').then( m => m.TimetablePageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./proj/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'marks-list',
    loadChildren: () => import('./proj/marks-list/marks-list.module').then( m => m.MarksListPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'fee-payment',
    loadChildren: () => import('./proj/payment/payment.module').then( m => m.PaymentPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'pay-report',
    loadChildren: () => import('./proj/pay-report/pay-report.module').then( m => m.PayReportPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'success',
    loadChildren: () => import('./proj/success/success.module').then( m => m.SuccessPageModule),
   
  },
  {
    path: 'class-list',
    loadChildren: () => import('./faculty/class-list/class-list.module').then( m => m.ClassListPageModule),
    canActivate: [AaaGuard]
  },
  // {
  //   path: 'fac-assignment',
  //   loadChildren: () => import('./faculty/fac-assignment/fac-assignment.module').then( m => m.FacAssignmentPageModule),
  //   canActivate: [AaaGuard]
  // },
  // {
  //   path: 'fac-assignment-stud-list',
  //   loadChildren: () => import('./faculty/fac-assignment-stud-list/fac-assignment-stud-list.module').then( m => m.FacAssignmentStudListPageModule),
  //   canActivate: [AaaGuard]
  // },
  {
    path: 'fac-password',
    loadChildren: () => import('./faculty/fac-password/fac-password.module').then( m => m.FacPasswordPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./faculty/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'assign-faculty',
    loadChildren: () => import('./faculty/assign-faculty/assign-faculty.module').then( m => m.AssignFacultyPageModule)
  },
  {
    path: 'assignment-notices',
    loadChildren: () => import('./faculty/assignment-notices/assignment-notices.module').then( m => m.AssignmentNoticesPageModule)
  },
  {
    path: 'assignmentedit',
    loadChildren: () => import('./faculty/assignmentedit/assignmentedit.module').then( m => m.AssignmenteditPageModule)
  },
  {
    path: 'menupop',
    loadChildren: () => import('./proj/menupop/menupop.module').then( m => m.MenupopPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./proj/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'fac-markentry',
    loadChildren: () => import('./faculty/fac-markentry/fac-markentry.module').then( m => m.FacMarkentryPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'class-list-mark',
    loadChildren: () => import('./faculty/class-list-mark/class-list-mark.module').then( m => m.ClassListMarkPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'save-marks',
    loadChildren: () => import('./faculty/save-marks/save-marks.module').then( m => m.SaveMarksPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'mark-remarks',
    loadChildren: () => import('./faculty/mark-remarks/mark-remarks.module').then( m => m.MarkRemarksPageModule),
    canActivate: [AaaGuard]
  },
  {
    path: 'remark-modal',
    loadChildren: () => import('./faculty/remark-modal/remark-modal.module').then( m => m.RemarkModalPageModule),
    canActivate: [AaaGuard]
  },
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

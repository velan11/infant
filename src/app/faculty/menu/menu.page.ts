import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  navigate: any;
  constructor() {
    this.sideMenu();
   }

  ngOnInit() {
  }

  sideMenu() {
    // this.menu.enable(false);
    // this.menu.swipeGesture(false);
console.log(localStorage.getItem('pas_faculty'))
    console.log(this.navigate, "asdf");
    if(localStorage.getItem('pas_faculty')) {
      this.navigate = [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: "home"
        },
        {
          title: "Attendance",
          url: "/class-list",
          icon: "",
          src: "../assets/images/calendar.png"
        },
        {
          title: "Assignment",
          url: "/assign-faculty",
          icon: "",
          src: "../assets/images/circular.png"
        },{
          title: "Change Password",
          url: "/fac-password",
          icon: "",
          src: "../assets/images/profile.png"
        }
      ];
    }
    if(localStorage.getItem('pas_tok')) {
      this.navigate = [
        {
          title: "Home",
          url: "/home",
          icon: "home"
        },
        {
          title: "Profile",
          url: "/profile",
          icon: "school"
        },
        {
          title: "Notification",
          url: "/noti",
          icon: "notifications-outline"
        },
        {
          title: "Attendance",
          url: "/attendanc",
          icon: "calendar"
        },
        {
          title: 'Fee',
          url: "/fee-payment",
          icon: 'pricetag-outline'
        },
        // {
        //   title: "eWallet",
        //   url: "/ewallet-dashboard",
        //   icon: "wallet"
        // },
        {
          title: "Progress Report",
          url: "/marks-list",
          icon: "book-outline"
        },

        {
          title: "Contact Us",
          url: "/contact",
          icon: "call"
        }
      ];
    }
  }

}

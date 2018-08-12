
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent {
  isLoggedIn: boolean = false;
  isSuperAdminLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  isRecieverLoggedIn: boolean = false;
  isDonorLoggedIn: boolean = false;
  isLoggedOut: boolean = true;
  isUserLoggedIn: boolean = false;
  constructor(private router: Router) {

  }
  ngOnInit() {
    this.ShowDetails();
  }
  ShowDetails() {
    var currentUser = localStorage.getItem("currentUser");
    var User = JSON.parse(currentUser);
    console.log(User.type, "eye d")


    switch (User.type) {
      case "donor":
        this.isDonorLoggedIn = true;
        this.isLoggedIn = true;
        this.isLoggedOut = false;
        this.isUserLoggedIn = true
      
        
        break;
      case "reciever":
        this.isRecieverLoggedIn = true;
        this.isLoggedIn = true;
        this.isLoggedOut = false;
        this.isUserLoggedIn = true
        

        break;
      case "admin":
        this.isAdminLoggedIn = true;
        this.isLoggedIn = true;
        this.isLoggedOut = false;
        this.isUserLoggedIn = true
        
        break;
      case "superAdmin":
        this.isSuperAdminLoggedIn = true;
        this.isLoggedIn = true;
        this.isLoggedOut = false;
        this.isUserLoggedIn = true
        
    }
  }
  logout() {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLogin", "false")
    this.router.navigate(['/']);
    this.isLoggedIn = false;
    this.isLoggedOut = true;
    this.isSuperAdminLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.isUserLoggedIn = false;
    this.isRecieverLoggedIn = false;
    this.isDonorLoggedIn = false;
  }
  navigator() {
    var currentUser = localStorage.getItem("currentUser");
    var User = JSON.parse(currentUser);
    switch (User.type) {
      case "donor":
        this.router.navigate(['/donprofstruct']);
        this.isUserLoggedIn = true
        break;
      case "reciever":
        this.router.navigate(['/recprofstruct']);
        this.isUserLoggedIn = true
        break;
      case "admin":
        this.router.navigate(['/admin']);
        this.isUserLoggedIn = true
        break;
      case "superAdmin":
        this.router.navigate(['/superadmin']);
        this.isUserLoggedIn = true
        
    }
  }
}


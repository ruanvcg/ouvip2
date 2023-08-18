import { Component } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OuviP2';

  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(private dataService: ApiService){
    dataService.getLoggedInName.subscribe(name => this.changeName(name));

    if(this.dataService.isLoggedIn()){
      console.log("LoggedIn");
      this.loginbtn = false;
      this.logoutbtn = true;
    }else{
      this.loginbtn = true;
      this.logoutbtn = false;
    }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  logout(){
    this.dataService.deleteAdminToken();
    this.dataService.deleteUserToken();

    window.location.href = window.location.href;
  }
}

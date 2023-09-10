import { Component } from '@angular/core';
import { ApiService } from './services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OuviP2';

  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(private dataService: ApiService) {
    // Subscribe to the logged-in state changes from ApiService
    dataService.getLoggedInName.subscribe(name => this.changeName(name));

    // Check if the user is logged in
    if (this.dataService.isLoggedIn()) {
      console.log("LoggedIn");
      this.loginbtn = false;
      this.logoutbtn = true;
    } else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
  }

  // Callback function to handle changes in login status
  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  // Logout function to clear tokens and refresh the page
  logout() {
    // Clear both admin and user tokens
    this.dataService.deleteAdminToken();
    this.dataService.deleteUserToken();

    // Refresh the page to update the login status
    window.location.href = window.location.href;
  }
}

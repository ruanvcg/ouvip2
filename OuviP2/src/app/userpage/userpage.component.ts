import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit{

  auth: any;
  constructor(
    private router: Router
  ){}
  
  ngOnInit(): void{
    this.auth = localStorage.getItem('tokenUser');
  
    if(!this.auth || this.auth == undefined || this.auth == null || this.auth == NONE_TYPE){
      this.router.navigate(['/login']);
    }
  }

}

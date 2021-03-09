import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any = {};
  // loggedIn:boolean = false;
  
  // loggedIn:boolean = false;
  // currentUser$: Observable<User> | undefined;

  constructor(public accountService:AccountService) { }

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    let user = {
      username:this.model.username.trim(),
      password:this.model.password
    }
    console.log(user);
    this.accountService.login(user).subscribe((response)=>{
      console.log(response);
      // this.loggedIn = true;
    },
    (error: any)=>{
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
    // this.loggedIn = false;
  }

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user=>{
  //     console.log("Logged in : ",this.loggedIn,user);
  //     this.loggedIn = !!user;
  //   },error=>{
  //     console.log(error);
  //   })
  // }
}

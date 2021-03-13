import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService:AccountService, private router: Router, 
    private toastr:ToastrService) { }

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    let user = {
      username:this.model.username.trim(),
      password:this.model.password
    }
    this.model = {};
    console.log(user);
    this.accountService.login(user).subscribe((response)=>{
      console.log(response);
      // this.loggedIn = true;
      this.router.navigateByUrl('/members');
    },
    (error: any)=>{
      console.log(error);
      // this.toastr.error(error.error);
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
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

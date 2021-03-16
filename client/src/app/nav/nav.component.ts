import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
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

  loginForm!: FormGroup;
  // loggedIn:boolean = false;
  
  // loggedIn:boolean = false;
  // currentUser$: Observable<User> | undefined;

  constructor(public accountService:AccountService, private router: Router, 
    private toastr:ToastrService, private fb: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;
    this.initializeLoginForm();
  }

  initializeLoginForm(){
      this.loginForm = this.fb.group({
        username: ['',Validators.required],
        password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]]
      });
  }
  login(){
    
    this.accountService.login(this.loginForm.value).subscribe((response)=>{
      console.log(response);
      // this.loggedIn = true;
      this.router.navigateByUrl('/members');
      this.alertService.success('Logged in successfully!');
    },
    (error: any)=>{
      console.log(error);
      // this.toastr.error(error.error);
      this.alertService.danger(error.error);
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

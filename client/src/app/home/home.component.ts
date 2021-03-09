import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  users: any;
  constructor(private httpClient: HttpClient, public accountService: AccountService) { }

  ngOnInit(): void {
    // this.getUsers();
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  // getUsers(){
  //   this.httpClient.get("https://localhost:5001/api/users").subscribe((res)=>{
  //   this.users = res;
  //   console.log(this.users);
  //   },(error)=>{
  //     console.log("Error while fetching users");
  //   });
  // }

  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
}

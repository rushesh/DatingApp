import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @Input() usersFromHomeComponet: any;

  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(public accountService:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    const user = {
      username:this.model.username.trim(),
      password:this.model.password
    };
    this.accountService.register(user).subscribe((res)=>{
      // console.log(res);
      this.cancel();
    },(error)=>{
      console.log(error)
    });
    
  }

  cancel(){
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }

}

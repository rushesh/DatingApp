import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @Input() usersFromHomeComponet: any;

  noResult = false;
  isLocationValid = false;
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  constructor(public accountService:AccountService, 
    private toastr:ToastrService, private fb: FormBuilder, 
    private router:Router){}
  maxDate!: Date;

  validationErrors:any = [];
  ngOnInit(): void {
  this.initializeForm();      
  this.maxDate = new Date();
  this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender:['male'],
      knownAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      location:['', Validators.required],
      username: ['', Validators.required],
      password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')]]
    });

    this.registerForm.controls.password.valueChanges
    .subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: any){
    return (control: any)=>{
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true};
    }
  }
  register(){
    this.accountService.register(this.registerForm.value).subscribe((res: any)=>{
      this.router.navigateByUrl("/members");
      this.toastr.success("You can now explore your interests.","Registered Successfully!")
      this.cancel();
    },(error: any)=>{
      this.validationErrors.push(error.error);
      console.log(error);
    });
    
  }
  checkLocationValidity(){
    const res = this.accountService.locations.includes(this.registerForm.value.location?.trim()); 
    if(res){
      this.isLocationValid = true;
    }
    else{
      this.isLocationValid = false;
    }
    console.log(this.registerForm.value.location?.trim(),this.isLocationValid, this.registerForm.valid);
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
  typeaheadNoResults($event: boolean): void {
    this.noResult = $event;
  }
}

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member!: Member;
  user!: User;
  isLocationValid = true;
  noResult = false;
  editUserForm!: FormGroup;
  @ViewChild('editForm') editForm!: NgForm;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
        $event.returnValue=true;
    }
  }
  constructor(public accountService: AccountService, 
    private fb2: FormBuilder,
    private memberService: MembersService, private toastr: ToastrService) { 
    this.accountService.currentUser$
    .pipe(take(1))
    .subscribe((user)=>{
      this.user = user
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMember();
  }

  typeaheadNoResults(event: any): void {
    this.noResult = event;
  }
  
  checkLocationValidity(){
    const res = this.accountService.locations.includes(this.editUserForm.value.location); 
    if(res){
      this.isLocationValid = true;
    }
    else{
      this.isLocationValid = false;
    }
  }

  initializeForm(){
    // console.log(this.member, this.user);
    this.editUserForm = this.fb2.group({
      introduction:[this.member?.introduction],
      lookingFor:[this.member?.lookingFor],
      interests:[this.member?.interests],
      location:[this.member?.location, Validators.required]
    });

  }

  loadMember(){
    this.memberService
    .getMember(this.user.username)
    .subscribe((member)=>{
      this.member = member;
    },(error)=>{

    },()=>{
      this.initializeForm();
    });
  }
  updateMember()
  {
    console.log(this.editUserForm.value)
    console.log(this.member)
    this.memberService.updateMember(this.member).subscribe(()=>{
    this.toastr.success("Profile updated successfully.","Success")
    },(error)=>{
      this.toastr.error("Profile update failed. Please try later.","Error")
    })
  }

}

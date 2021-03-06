import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  locations = [
    "alaska", "germany", "spain"
];

  baseUrl = environment.baseURL;
  constructor(private http:HttpClient) { }

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  login(model:any)
  {
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((response: User)=>{
        const user = response;
        console.log("From Service : ",user);
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next();
  }

  setCurrentUser(user: User){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  register(model:any)
  {
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
      map((response: User)=>{
        const user = response;
        console.log("From Service : ",user);
        if(user){
          this.setCurrentUser(user);
        }
        // return user;
      })
    );
  }


}

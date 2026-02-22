import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userURL: string = "http://localhost:3000/users";
  
constructor(private httpClient: HttpClient) { }

 signup(user:any , img : File) {

    let fData = new FormData();
    fData.append("img",img);
    fData.append("firstName",user.firstName);
    fData.append("lastName",user.lastName);
    fData.append("email",user.email);
    fData.append("password", user.password);
    fData.append("role",user.role);
    fData.append("phone", user.phone);
    fData.append("address", user.address);
    if (user.specialty) fData.append("specialty", user.specialty);
    if (user.childPhone) fData.append("childPhone", user.childPhone);

   return this.httpClient.post<{ msg : string}>(this.userURL +"/signup",fData);

   }
  login(user:any) {

      return this.httpClient.post<{ msg : string , user : any}>(this.userURL +"/login",user);

   }

}

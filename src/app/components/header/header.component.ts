import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
constructor(
    private router: Router,
    ) { }
user:any={};

    isloggedIn():boolean{
let token = sessionStorage.getItem("token");
if (token) {
this.user=jwtDecode(token);
}
return !!token;

}


logout(){
  sessionStorage.removeItem("token");
this.router.navigate([""]);
}


}

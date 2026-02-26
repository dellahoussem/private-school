import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-tab-parent',
  imports: [NgForOf],
  templateUrl: './tab-parent.component.html',
  styleUrl: './tab-parent.component.css'
})
export class TabParentComponent {
  constructor(private userService: UserService) {}
  userTab:any=[];
ngOnInit() {
  this.userService.getUserByRole('parent').subscribe(
    (response) => {
      this.userTab = response;
      console.log(this.userTab);
    },
    (error) => {
      console.log(error);
    }
  );
}

deleteUser(id:any){
  this.userService.deleteUser(id).subscribe(
    (response) => {
      console.log(response.msg);
      this.userTab = this.userTab.filter((user: any) => user._id !== id);
    },
    (error) => {
      console.log(error);
    }
  );
}
   
}

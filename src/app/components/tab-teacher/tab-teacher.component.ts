import { Component } from '@angular/core';
import { NgForOf, NgClass } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tab-teacher',
  imports: [NgForOf, NgClass],
  templateUrl: './tab-teacher.component.html',
  styleUrl: './tab-teacher.component.css'
})
export class TabTeacherComponent {
constructor(private userService: UserService) {}
userTab:any=[];

ngOnInit() {
  this.loadTeachers();
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

Status(id: string) {
  this.userService.Status(id).subscribe(() => {
    this.loadTeachers();
  });
}

loadTeachers(){
this.userService.getUserByRole('teacher').subscribe(
    (response) => {
      this.userTab = response;
      console.log(this.userTab);
    },
    (error) => {
      console.log(error);
    }
  );
}

}

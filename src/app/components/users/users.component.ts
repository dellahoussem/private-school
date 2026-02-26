import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { TabStudentComponent } from "../tab-student/tab-student.component";
import { TabTeacherComponent } from "../tab-teacher/tab-teacher.component";
import { TabParentComponent } from "../tab-parent/tab-parent.component";

@Component({
  selector: 'app-users',
  imports: [TabStudentComponent, TabTeacherComponent, TabParentComponent, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
selectedTab: string = 'student';
selectTab(tab: string) {
  this.selectedTab = tab;
}
}

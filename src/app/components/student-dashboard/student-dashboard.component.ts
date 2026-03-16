import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-student-dashboard',
  imports: [RouterLink,NgFor],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
courses: any[] = [];
studentId!: string;
user:any={};
constructor(private studentService: StudentService , private router: Router) {}

ngOnInit() {
  let token = sessionStorage.getItem("token");
  if (token) {
  this.user=jwtDecode(token);
  }
  this.studentId = this.user.id!;
  this.loadCourses();
}

loadCourses() {
  this.studentService.getMyCourses(this.studentId)
    .subscribe((data: any) => {
      this.courses = data;
    });
}

voirEvaluation(courseId: string) {
    this.router.navigate(['/student-course', courseId]);
  }

}

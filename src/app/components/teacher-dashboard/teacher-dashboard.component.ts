import { Component } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [RouterLink,NgFor],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent {

courses: any[] = [];
  totalStudents = 0;
 constructor(private coursService: CoursService, private router: Router, private teacherService: TeacherService) {}

ngOnInit(): void {
    this.getMyCourses();
  }

  getMyCourses() {
    const token = sessionStorage.getItem('token');

  if (token) {
    const decoded: any = jwtDecode(token);

    this.teacherService
      .getMyCourses(decoded.id)
      .subscribe((data: any) => {

        this.courses = data;

        this.totalStudents = 0;
        this.courses.forEach(c => {
          this.totalStudents += c.studentsId.length;
        });

      });
  }
  }

deleteCourse(id: string) {
    this.coursService.deleteCours(id).subscribe(() => {
      this.getMyCourses();
    });
  }








}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-teacher-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './teacher-add-course.component.html',
  styleUrl: './teacher-add-course.component.css'
})
export class TeacherAddCourseComponent {
addForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router
  ) {
 this.addForm = this.fb.group({
  name: ['', Validators.required],
  description: [''],
  duration: ['', Validators.required],
  startDate: ['', Validators.required]
});
  }

addCourse() {

    if (this.addForm.invalid) return;

    const token = sessionStorage.getItem('token');

    if (token) {

      const decoded: any = jwtDecode(token);

      this.teacherService
        .addCourse(this.addForm.value, decoded.id)
        .subscribe(() => {
          this.router.navigate(['/teacher-dashboard']);
        });
    }
  }
}







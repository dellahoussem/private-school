import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-courses.component.html',
  styleUrl: './teacher-courses.component.css'
})
export class TeacherCoursesComponent {
coursId!: string;
  cours: any;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.coursId = this.route.snapshot.paramMap.get('id')!;
    this.getCourse();
  }

  getCourse() {
    this.teacherService
      .getCourseById(this.coursId)
      .subscribe((data: any) => {
        this.cours = data;
      });
  }

  saveGrade(student: any) {

    this.teacherService.gradeStudent({
      studentId: student._id,
      coursId: this.coursId,
      note: student.note,
      evaluation: student.evaluation
    }).subscribe(() => {
      alert("Note enregistrée ✅");
    });

  }

}




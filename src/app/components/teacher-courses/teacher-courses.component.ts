import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-courses',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teacher-courses.component.html',
  styleUrl: './teacher-courses.component.css'
})
export class TeacherCoursesComponent {
coursId!: string;
  cours: any;
  gradeForms: { [key: string]: FormGroup } = {};

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private fb: FormBuilder
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
        this.initializeForms();
      });
  }

  initializeForms() {
    this.cours.students.forEach((student: any) => {
      this.gradeForms[student._id] = this.fb.group({
        note: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
        evaluation: ['', [Validators.required, Validators.minLength(5)]]
      });
    });
  }

  saveGrade(student: any) {

    const form = this.gradeForms[student._id];

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.teacherService.gradeStudent({
      studentId: student._id,
      coursId: this.coursId,
      note: form.value.note,
      evaluation: form.value.evaluation
    }).subscribe(() => {

      alert("Note enregistrée ✅");
      this.getCourse(); // recharge proprement

    });
  }

  getNotGradedStudents() {
    return this.cours?.students?.filter(
      (s: any) => s.note == null
    ) || [];
  }

  getGradedStudents() {
    return this.cours?.students?.filter(
      (s: any) => s.note != null
    ) || [];
  }


}




import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-student-course',
  imports: [NgIf, RouterLink],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css'
})
export class StudentCourseComponent {
studentId!: string;
  courseId!: string;
  user:any={};
  course: any;
  note: number | null = null;
  evaluation: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.errorMessage = "Token manquant. Veuillez vous reconnecter.";
      return;
    }

    try {
      const decoded: any = JSON.parse(atob(token.split('.')[1]));
      this.studentId = decoded.id;
    } catch (err) {
      this.errorMessage = "Token invalide.";
      return;
    }

    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourseDetails();
  }

  loadCourseDetails() {
    this.studentService.getCourseDetails(this.studentId, this.courseId)
      .subscribe({
        next: (data: any) => {
          if (!data || !data.cours) {
            this.errorMessage = "Cours introuvable ou pas encore évalué.";
            return;
          }
          this.course = data.cours;
          this.note = data.note;
          this.evaluation = data.evaluation;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "Erreur lors du chargement des données.";
        }
      });
  }



}

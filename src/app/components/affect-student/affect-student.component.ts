import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from '../../services/cours.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-affect-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './affect-student.component.html',
  styleUrl: './affect-student.component.css'
})
export class AffectStudentComponent {

coursId!: string;
  students: any[] = [];
  studentsAffect : any[] = [];
 
  cours: any; 
  selectedStudentId: string = '';

    constructor(
    private route: ActivatedRoute,
    private coursService: CoursService,
    private userService: UserService,
    
    private router: Router
  ) {}

  updateAvailableStudents() {
   if (!this.cours || !this.cours.studentsId) {
    this.studentsAffect = this.students;
    return;
  }

  this.studentsAffect = this.students.filter(
    s => !this.cours.studentsId.some(
      (student: any) => student._id === s._id
    )
  );
}

ngOnInit() {
  this.coursId = this.route.snapshot.paramMap.get('id')!;
  this.loadCoursAndStudents();
}

loadCoursAndStudents() {
  this.coursService.getCoursById(this.coursId).subscribe(res => {
    this.cours = res;
    this.userService.getUserByRole('student').subscribe(
      (response: any[]) => {
        this.students = response;
        this.updateAvailableStudents();
      },
      err => console.log(err)
    );
  });
}

affectStudent() {
  if (!this.selectedStudentId) return;

  this.coursService.affectStudent(this.coursId, this.selectedStudentId).subscribe({
    next: (res: any) => {
      alert('Student affecté avec succès ✅');

      const student = this.students.find(s => s._id === this.selectedStudentId);
      if (student) this.cours.studentsId.push(student);

      // Recalculer automatiquement les étudiants disponibles
      this.updateAvailableStudents();

      this.selectedStudentId = '';
    },
    error: (err) => {
      console.error('Erreur lors de l\'affectation :', err);
      alert('Erreur lors de l\'affectation ❌');
    }
  });
}

removeStudent(studentId: string) {

  this.coursService.removeStudent(this.coursId, studentId)
    .subscribe({
      next: (res: any) => {

        // Supprimer de la liste affichée
        this.cours.studentsId = this.cours.studentsId.filter(
          (s: any) => s._id !== studentId
        );

        // Recalculer les étudiants disponibles
        this.updateAvailableStudents();

        alert("Student retiré avec succès ❌");
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la suppression ❌");
      }
    });
}


}

  

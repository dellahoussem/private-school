import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursService } from '../../services/cours.service';
import { Router } from '@angular/router';
import { CoursComponent } from '../cours/cours.component';


@Component({
  selector: 'app-add-cours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-cours.component.html',
  styleUrl: './add-cours.component.css'
})
export class AddCoursComponent implements OnInit {

  coursForm!: FormGroup;
  teachers: any[] = [];
  msg: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private coursService:CoursService,
    private router: Router
    
  ) {}
   

  

  ngOnInit() {

    this.coursForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      duration: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      teacherId: ['', Validators.required]
    });

    this.loadTeachers();
  }

  loadTeachers() {
    this.userService.getUserByRole('teacher').subscribe(
      {
        next: (response: any[]) => {
          this.teachers = response.filter(teacher => teacher.etat === 'active');
          console.log(this.teachers);
        },
        error: (error) => {
          console.error('Error loading teachers:', error);
        }
      }
    );
  }

  addCours() {
    if (this.coursForm.valid) {
      this.coursService.addCours(this.coursForm.value).subscribe({
        next: (response) => {
          console.log("Cours ajouté avec succès", response);
          alert("Cours ajouté avec succès ✅");
          
          this.coursForm.reset();
          
        },
        error: (error) => {
          console.error('Error adding course:', error);
          this.msg = "Erreur lors de l'ajout du cours";
        }
      });
    } else {
      this.coursForm.markAllAsTouched();
    }
   
  }
}


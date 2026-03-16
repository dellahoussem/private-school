import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { UsersComponent } from './components/users/users.component';
import { CoursComponent } from './components/cours/cours.component';
import { AffectStudentComponent } from './components/affect-student/affect-student.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherAddCourseComponent } from './components/teacher-add-course/teacher-add-course.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';

export const routes: Routes = [
     { path: "", component: HomeComponent },
     { path: "signup/:role", component: SignUpComponent },
    
    { path: "login", component: LogInComponent },
    { path: "users", component: UsersComponent },
    { path: "cours", component: CoursComponent },
    { path: "affectStudent/:id", component: AffectStudentComponent},
    { path: "teacher-dashboard", component: TeacherDashboardComponent},
    { path: "add-course", component: TeacherAddCourseComponent},
    { path: "teacher-courses/:id", component: TeacherCoursesComponent},
    { path: "student-dashboard", component:StudentDashboardComponent },
    { path: "student-course/:id", component : StudentCourseComponent },
  
  
   


    
];

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { UsersComponent } from './components/users/users.component';
import { CoursComponent } from './components/cours/cours.component';

export const routes: Routes = [
     { path: "", component: HomeComponent },
     { path: "signup/:role", component: SignUpComponent },
    
    { path: "login", component: LogInComponent },
    { path: "users", component: UsersComponent },
    { path: "cours", component: CoursComponent }
   


    
];

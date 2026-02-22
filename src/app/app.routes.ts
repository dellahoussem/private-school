import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

export const routes: Routes = [
     { path: "", component: HomeComponent },
     { path: "signup/:role", component: SignUpComponent },
    { path: "login", component: LogInComponent },
    
];

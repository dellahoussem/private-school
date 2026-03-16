import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  loginForm!: FormGroup;
  errorMsg = "";

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({

      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    })
  }

  login() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log("here is response after login", res);
        if (res.msg == "0") {
          sessionStorage.setItem("token", res.user);
          const decoded: any = jwtDecode(res.user);
          console.log("here is response after decodage", decoded);
          if (decoded.role === 'teacher') {
            this.router.navigate(['/teacher-dashboard']);
          }
          else if (decoded.role === 'student') {
            this.router.navigate(['/student-dashboard']);
          }
          else {
        this.router.navigate(['']);
      }
        } else if (res.msg == "5") {
          this.errorMsg = "Votre compte est en attente d'activation.";
        } else {
          this.errorMsg = "Veuillez vérifier votre email/mot de passe";
        }
      });
  }
}

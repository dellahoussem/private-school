import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  constructor(private route: ActivatedRoute , private formBuilder: FormBuilder , private userService: UserService , private router: Router) {}

role!: string;
signupForm!: FormGroup;
selectedFile?: File;
  errorMsg = "";

 ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role')!;
      console.log("Selected role:", this.role);
      
      this.signupForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        specialty: [''], // Optionnel, selon le rôle
        childPhone: [''] // Optionnel, selon le rôle
      });

      if (this.role === 'teacher') {
        this.signupForm.get('specialty')?.setValidators([Validators.required]);
        this.signupForm.get('specialty')?.updateValueAndValidity();
      } else if (this.role === 'parent') {
        this.signupForm.get('childPhone')?.setValidators([Validators.required]);
        this.signupForm.get('childPhone')?.updateValueAndValidity();
      }
    });
  }


onFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

inscription(){
  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched();
    return;
  }

  if ((this.role === 'teacher' || this.role === 'student') && !this.selectedFile) {
    this.errorMsg = "Veuillez sélectionner un fichier (Photo ou CV).";
    return;
  }

  let user = this.signupForm.value;
    user.role = this.role;
    console.log(user);

    // Ensure a file is selected if your logic requires it, or handle undefined in service
    const fileToSend = this.selectedFile || new File([], "empty");

     this.userService.signup(user, fileToSend).subscribe(
      (res) => {
        console.log("here is response after adedd ", res);
        if (res.msg == "2") {
          this.errorMsg = "Cet email existe déjà";
        } else if (res.msg == "3") {
          this.errorMsg = "Erreur lors de l'enregistrement";
        } 
        else if (res.msg == "4") {
          this.errorMsg = "verifier le numéro de téléphone du childPhone";
        } 
        else {
          this.router.navigate(['']);
        }
      }
    );

}

}

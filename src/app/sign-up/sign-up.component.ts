import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../Models/skill';
import { UserService } from '../services/user.service';
import { UserDto } from '../Models/user';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,CommonModule, MatSelectModule, MatSnackBarModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  skills: Skill[] = [
    {id: "9b212a2a-ede8-4553-a74c-d3625aaf9c75", name: "C#", fieldId : 'c186bf2d-b412-4478-baa4-245e298ba6f9'},
    {id: "0a546c0b-fa92-4b8d-a7c6-6cdae58846dd", name: "Java", fieldId: 'c186bf2d-b412-4478-baa4-245e298ba6f9'}
  ]
  signUpForm: FormGroup;
  profileType: string = '';
  constructor(private fb: FormBuilder,  
    private router: Router, 
    private serviceUser: UserService, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ){
    this.signUpForm = this.fb.group({ 
      name: ['', Validators.required], 
      login: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]], 
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      dateofbirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]], 
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
      yearofexperience: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      company: [''],
      skills: [null, [ Validators.required ] ],
    }); 
  }
  ngOnInit() {
  
    this.route.params.subscribe(params => {
      console.log(params);
      this.profileType = params['profileType'];
      console.log(this.profileType);
      this.updateFormValidators();
    });
  }

  updateFormValidators() {
    if (this.profileType === 'Hr') {
      this.signUpForm.get('company')?.setValidators(Validators.required);
      this.signUpForm.get('skills')?.clearValidators();
    } else if (this.profileType === 'JobSeeker') {
      this.signUpForm.get('company')?.clearValidators();
      this.signUpForm.get('skills')?.setValidators(Validators.required);
    }
    this.signUpForm.get('company')?.updateValueAndValidity();
    this.signUpForm.get('skills')?.updateValueAndValidity();
  }
  onSubmit(){

    if(this.signUpForm.valid){
      const newUser: UserDto = {
        id: '',
        name: this.signUpForm.get('name')?.value,
        userType: 'JobSeeker',
        login: this.signUpForm.get('login')?.value,
        email: this.signUpForm.get('email')?.value,
        passwordHash: this.signUpForm.get('password')?.value,
        phone: this.signUpForm.get('phone')?.value,
        dateOfBirth: this.signUpForm.get('dateofbirth')?.value,
        levelOfExperience: this.signUpForm.get('yearofexperience')?.value,
        skills: this.skills,
      }
   
      this.serviceUser.createUser(newUser).subscribe({
        next: (usr) => { 
          console.log('User Created:', usr); 
          this.snackBar.open('User created successfully!', 'Close', { duration: 3000 }); 

        }, error: (error) => { 
            console.error('Error creating user:', error); 
         this.snackBar.open('Failed to create user!', 'Close', { duration: 3000 }); 
         //console.log('New User Created:', newUser); 
        }
      });
    }
  }

}

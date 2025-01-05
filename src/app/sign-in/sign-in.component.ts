import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,CommonModule, RouterLink, MatRadioModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder,  private router: Router){
    this.loginForm = this.fb.group({ 
      username: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(8)]],
      profile: ['Hr', Validators.required], 
    }); 
  }

  onSubmit() {
    if (this.loginForm.valid) { 
      const profile = this.loginForm.get('profile')?.value; 
      this.router.navigate(['/home'], { queryParams: { profile } }); 
      console.log('Form Submitted!', this.loginForm.value);
    }
  }

  selectedProfile() : string{
    return "/sign-up/"+this.loginForm.get('profile')?.value;
  }
  
}

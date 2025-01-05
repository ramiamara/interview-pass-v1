import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../Models/user';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, 
    MatCardModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  userValid: boolean = true;
  user: User = {
    id : '',
    login: '',
    name : '',
    password : '',
    email:'',
    phone : ''
  }

 constructor(private service: UserService){
  
 }
  create() {
  }
}

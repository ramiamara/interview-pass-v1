import { Injectable } from '@angular/core';
import { User, UserDto } from '../Models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7178/api/'; //'http://89.117.52.26:1302/api/';
  constructor(private http: HttpClient) { }

  createUser(user: UserDto): Observable<UserDto>{

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
      return this.http.post<UserDto>(this.apiUrl + 'User', user, { headers }); 
  }

  login(){
    
  }
}

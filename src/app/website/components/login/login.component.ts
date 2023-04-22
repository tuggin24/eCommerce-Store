import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { CreateUserDTO } from '../../../models/user.model'
import { DataAuth, Auth } from '../../../models/auth.model'
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  newUser: CreateUserDTO = {
    name: 'agus',
    email: 'agustin@gmail.com',
    password: '123456',
    role: 'customer'
  };

  loginUser: DataAuth = {
    email: 'admin@mail.com',
    password: 'admin123'
  }

  token = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router:Router
  ){

  }

  ngOnInit(): void {
  }

  createUser(){
    this.usersService.create( this.newUser )
    .subscribe({
      next: (res) => console.log('create',res),
      error: () => {}
    });
  }

  login(){
    this.authService.login( this.loginUser )
    .subscribe({
      next: (res) => {
        console.log('login',res.access_token);
        this.token = res.access_token;
      },
      error: () => {}
    })
  }

  loginAndGet(){
    this.authService.login( this.loginUser )
    .pipe(
      switchMap( () => this.authService.getProfile() )
    )
    .subscribe({
      next: (res) => {
        this.router.navigate(['/profile']);
      },
      error: () => {}
    })
  }

  getProfile(){
    this.authService.profile( this.token )
    .subscribe({
      next: (res) => {
        this.authService.email.next(res.email);
      },
      error: () => {}
    })
  }

}

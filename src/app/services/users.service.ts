import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { CreateUserDTO, User }  from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = `${environment.API_URL}/api/users`;

  constructor(
    private http: HttpClient
  ) { }

  create( data: CreateUserDTO ){
    return this.http.post<User>( this.url, data );
  }

  getAll( datos: CreateUserDTO ){
    return this.http.get<User[]>( this.url );
  }
}

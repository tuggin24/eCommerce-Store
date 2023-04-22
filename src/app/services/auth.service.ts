import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../services/token.service'
import { environment } from '../../environments/environment'
import { DataAuth, Auth } from '../models/auth.model'
import { User } from '../models/user.model'
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.API_URL}/api/auth`;

  public email = new BehaviorSubject<string>('');
  email$ = this.email.asObservable();

  private user = new BehaviorSubject<User | null >(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login( data: DataAuth ){
    return this.http.post<Auth>( `${this.url}/login`, data )
    .pipe(
      tap( (data) => {
        this.tokenService.saveToken( data.access_token );
      })
    );
  }

  profile( token: string ){
    const myHeaders = new HttpHeaders();
    myHeaders.set('Authorization',`Bearer ${token}`);

    return this.http.get<User>(`${this.url}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json'
      }
    });
  }

  getProfile(){
    return this.http.get<User>(`${this.url}/profile`)
    .pipe(
      tap((user) => {
        this.user.next(user);
        console.log('UserGetProfile 2', this.user.value);
      })
    );
  }

  logout(){
    this.tokenService.removeToken();
  }
}

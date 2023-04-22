import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  private valid:boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return this.authService.user$
      // .pipe(
        
      //   map( (user) => {
      //     console.log('role->',user?.role);
      //     if(user?.role === 'admin'){
      //       return true;
      //     }else{
      //       this.router.navigate(['/home']);
      //       return false;
      //     }
      //   })
      // )

    //  this.authService.user$
    //   .subscribe({
    //     next: (user) => {
    //       console.log('role2->',user?.role);
    //       if(user?.role === 'admin'){
    //         return this.valid = true;
    //       }else{
    //         this.router.navigate(['/home']);
    //         return this.valid = false;
    //       }
    //     },
    //     error: (e) => console.log('error->',e)
    //   })
    //   return this.valid;
    const token = this.tokenService.getToken();
    if( token ){
      return this.authService.getProfile()
      .pipe(
        map((user) =>{
          if(user?.role === 'admin'){
            return true;
          }else{
            this.router.navigate(['/home'])
            return false;
          }
        })
      );
    }else{
      return false;
    }
  }
  
}

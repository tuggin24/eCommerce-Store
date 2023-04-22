import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service'
import { CategoriesService } from '../../../services/categories.service'
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/product.model';
import { Router } from '@angular/router'
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{


  activeMenu = false;
  sub$!: Subscription;
  emailSub$!: Subscription;
  counter = 0;
  emailUser: string | undefined = undefined;
  categories: Category[] = [];
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ){

  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
    console.log('activeMenu',this.activeMenu);
  }

  ngOnInit(): void {
    this.sub$ = this.storeService.myCart$.subscribe( products => {
      this.counter = products.length;
    } );

    this.emailSub$ = this.authService.email$.subscribe( (email) => {
      this.emailUser = email;
    })

    this.getAllCategories();

    this.authService.user$
    .subscribe((user) => {
      this.profile = user;
      this.emailUser = this.profile?.email;
    })

    if(this.profile){
      console.log('EXISTE');
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
    this.emailSub$.unsubscribe();
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe({
      next: (res) => {
        this.categories = res;
      }
    })
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}

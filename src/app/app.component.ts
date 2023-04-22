import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from './models/product.model'
import { FilesService } from '../app/services/files.service';
import { AuthService } from '../app/services/auth.service';
import { TokenService } from '../app/services/token.service'

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  imgParent = '';
  //imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg = true;
  imgRta = '';

  constructor(
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ){

    const token = this.tokenService.getToken();
    if( token ){
      this.authService.getProfile()
      .subscribe();
      console.log('El app llamo a profile');
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
  
  }

  onLoaded(img:string){
      console.log('Log del padre', img)
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }

  donwloadPDF(){
    this.filesService.getFile( 'Prueba.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf' )
    .subscribe({
        next: (n) => {
            console.log(n)
        },
        error: () => {}
    })
  }

  onUpload( event: Event ){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.filesService.uploadFile(file)
      .subscribe({
        next: (rta) => {
          this.imgRta = rta.location
        },
        error: () => {}
      });
    }
  }
}

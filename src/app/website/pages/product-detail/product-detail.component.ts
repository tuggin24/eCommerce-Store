import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from '../../../services/products.service'
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  idProduct: string | null = null;
  product: Product | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location,
    private router: Router
  ){}

  ngOnInit(): void {
      this.activatedRoute.paramMap
      .pipe(
        switchMap((params) =>{
          this.idProduct = params.get('id');
          if( this.idProduct != null ){
            return this.productsService.getProduct( this.idProduct );
          }
          return [null];
        })
      )
      .subscribe({
        next: (response) => this.product = response,
        error: (error) => console.log('errorDetalleProducto',error)
      });
  }

  goToback1(){
    this.router.navigate(['/home']);
  }

  goToback2(){
    this.location.back();
  }


}

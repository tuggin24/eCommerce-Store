import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service'
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  @Input() products: Product[] = [];
  @Input() productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap( (params) => {
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory( this.categoryId, this.limit, this.offset );
        }
        return [];
      })
    )
    .subscribe( (dataReturn) => {
      this.products = dataReturn;
    }, (error) => {
      console.log(error)
    });

    this.route.queryParamMap
    .subscribe({
      next: (params) =>{
        this.productId = params.get('product');
      },
      error: (e) => {console.log(e)}
    })
  }
  
  loadProducts(){
    if(this.categoryId){
      this.productsService.getByCategory( this.categoryId, this.limit, this.offset )
      .subscribe( (response) =>{
        this.products = this.products.concat(response);
      });
      this.offset += this.limit;
    }
  }

}

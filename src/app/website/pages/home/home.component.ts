import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service'
import { Product } from '../../../models/product.model' 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;
  
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.loadMore();
    this.activatedRoute.queryParamMap
    .subscribe((params) => {
      this.productId = params.get('product');
      console.log('product->',this.productId);
    })
  }

  loadMore(){
    this.productsService.getAllProducts( this.limit, this.offset ).subscribe((data: Product[]) => {
      this.products = this.products.concat( data );
      this.offset += this.limit;
    });
  }
}

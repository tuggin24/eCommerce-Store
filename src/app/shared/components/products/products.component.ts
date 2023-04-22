import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../../models/product.model';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  @Output() load = new EventEmitter();
  @Input() 
  set productId(id: string | null ){
    if(id){
      this.onShowDetail(id);
    }
  }
  showProductDetails = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';


  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.productsService.getAllProducts()
    // .subscribe(data => {
    //   this.products = data;
    // });

    //this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowDetail(id: string){
    /**
     * Metodo Obsoleto
     * en el subscribe ya no se usa por aparte la respuesta positiva y negativo
     * se usa next: positivo, error: negativo, complete: para saber que fue positivo creo
     */
    // this.productsService.getProduct(id).
    // subscribe(data => {
    //   console.log('data->',data);
    //   this.productChosen = data;
    //   this.toggleProductDetail();
    // }, errorMsg => {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: errorMsg,
    //     // footer: '<a href="">Why do I have this issue?</a>'
    //   });
    //   this.statusDetail = 'error';
    // } );

    this.productsService.getProduct(id).subscribe({
      complete: () => { console.info('complete') },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e,
        });
        this.statusDetail = 'error';
      },
      next: (data) => {
        console.log('data->',data);
        this.productChosen = data;
        if(!this.showProductDetails){
          this.showProductDetails = true;
        }
        // this.toggleProductDetail();
      }
    });
  }

  /**
   *
   * Evitar el callback Hell
   * De esta forma se puede llamar varias peticiones y que el codigo sea mantenible
   * switchMap: Se usa para llamar funciones que dependende de otras
   * zip: Se usa para llamar varias al mismo tiempo
   */
  readAndUpdate( id: string ){
    this.productsService.getProduct(id)
    .pipe(
      switchMap( (producto) => this.productsService.update( producto.id, { title: 'change' } )  )
      //Aca se puede agregar otro separado por coma: ,switchMap( (producto) => this.productsService.update( producto.id, { title: 'change' } )  )
    )
    .subscribe({
      next: (rtaUpdate) => console.log('rtaUpdate',rtaUpdate),
      error: () => {}
    });

    this.productsService.fetchReadAndUpdate( id, { title : 'Nuevo Titulo Producto' } )
    .subscribe({
      next: (r) => { console.log('r',r) },
      error: () => {}
    })
  }

  toggleProductDetail(){
    this.showProductDetails = !this.showProductDetails;
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Descripcion de producto',
      price: 150,
      images: [ 'https://placeimg.com/640/480/any?random=${Math.random()}', 'https://placeimg.com/640/480/any?random=${Math.random()}' ],
      categoryId: 2
    };
    this.productsService.create( product ).subscribe( data => {
      console.log('created->',data);
      this.products.unshift( data );
    } );
  }

  updateProduct(){
    let changes: UpdateProductDTO = {
      title : 'Nuevo Titulo Producto'
    };
    let id = this.productChosen.id;
    this.productsService.update( id, changes ).subscribe( data => {

      this.productChosen = data;
      const productIndex = this.products.findIndex( item => item.id === this.productChosen.id );
      this.products[productIndex] = data
    } );
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe( () => {
      const productIndex = this.products.findIndex( item => item.id === this.productChosen.id );
      this.products.splice( productIndex, 1 );
      this.showProductDetails = false;
    } );
  }

  loadMore(){
    this.load.emit();
  }

}

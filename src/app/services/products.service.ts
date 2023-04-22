import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, retryWhen, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { environment } from '../../environments/environment'
import { checkTime } from '../interceptors/time.interceptor'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private url: string = `${environment.API_URL}/api/`;

  constructor(
    private http: HttpClient
  ) {

  }

  getAllProducts( limit?: number, offset?: number ) {
    let params = new HttpParams();
    if( limit && offset ){
      params = params.set( 'limit', limit );
      params = params.set( 'offset', offset )
    }
    return this.http.get<Product[]>( `${this.url}products`, { params, context: checkTime() } ).pipe(
      retry( 3 ),
      map( products => {
        return products.map( item => {
          return {
            ...item,
            taxes: 0.19 * item.price
          }
        });
      })
    );
  }

  getByCategory( categoryId: string, limit?: number, offset?: number ){
    let params = new HttpParams();
    if( limit && offset != null ){
      params = params.set( 'limit', limit );
      params = params.set( 'offset', offset );
    }

    return this.http.get<Product[]>( `${this.url}/categories/${categoryId}/products`, { params } );
  }

  fetchReadAndUpdate( id: string, dtoChange: UpdateProductDTO ){
    return zip(
      this.getProduct( id ),
      this.update( id, dtoChange )
    );
  }

  getProduct( id: string ){
    return this.http.get<Product>( `${this.url}/products/${id}` ).pipe(
      catchError( (error: HttpErrorResponse)  => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError( () => 'Algo esta fallando en el server');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError( () => 'El producto no existe' );
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError( () => 'No estas permitido' );
        }
        return throwError( () => 'Ups algo salio mal' );
      })
    )
  }

  getProductsByPage( limit: number, offset: number ){
    return this.http.get<Product[]>( `${this.url}`, { params: { limit, offset } } );
  }

  create( dto: CreateProductDTO ){
    return this.http.post<Product>( `${this.url}/products`, dto );
  }

  update( id: string, dto: UpdateProductDTO ){
    return this.http.put<Product>( `${this.url}/products/${id}`, dto );
  }

  delete( id: string ){
    return this.http.delete<boolean>(`${this.url}/products/${id}`);
  }
}

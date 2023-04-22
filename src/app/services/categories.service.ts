import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category} from '../models/product.model'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url = `${environment.API_URL}/api/categories`;

  constructor(
    private http: HttpClient
  ) { }

  getAll( limit?: number, offset?: number ){
    const params = new HttpParams();
    if(limit && offset != null){
      params.set( 'limit', limit);
      params.set( 'offset', offset);
    }
    return this.http.get<Category[]>( `${this.url}`, {params} );
  }
}

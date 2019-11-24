import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public server = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //Service method to search products by given filter
  searchProducts(filterQuery = null) {
    return this.http.get(this.server + `/product/all${filterQuery ? '?'+filterQuery : ''}`);
  }

  //Actio triggered to add a product
  addProduct(productData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log('productData', productData)
    return this.http.post(this.server + '/product/add', productData, httpOptions);
  }
}

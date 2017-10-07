import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  // inject http service inside this service, cool again right!
  constructor(private http: Http) { }

  // define a cart that will hold the data coming from the database
  public cart = [];

  // send a get request to the server to get the products
  getProducts() {
    const that = this;
    this.http.get('http://localhost:3000').subscribe(function() {
      that.http.post('http://localhost:3000/users', {}).subscribe();
    });

    return this.http.get('http://localhost:3000/products')
        .map(res => res.json());
  }

  // send the added product to the server
  AddToCart(product) {
    this.cart.push(product);
    this.http.post('http://localhost:3000/cart', product).subscribe();
  }

  // delete a product from the database
  removeProduct(product) {
    this.http.delete('http://localhost:3000/cart/?' + product._id).subscribe();
  }

  // make a way for other components to access cart in this comp.
  getCart() {
    return this.cart;
  }

  // the following function is to simulate a slow connection, it's just for testing

  // getProductsSlowly(): Promise<Product[]> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(this.getProducts()), 2000);
  //   });
  // }
}

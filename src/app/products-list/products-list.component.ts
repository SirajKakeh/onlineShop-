import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  // displayed products array
  products: any[];

  // make an instance of the service that we want the component to use, this is called "Service Injection"
  constructor(private productService: ProductService) { }

  // use productService getProducts to fetch products from the database and store them in products array,
  // Angular automatically detects when the array is changed and displays products, cool right!!!
  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  ngOnInit(): void {
    // call the getProducts function when component loads
    this.getProducts();
  }
}

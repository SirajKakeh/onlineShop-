import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  products: any[];
  selectedProduct: any;
  constructor(private productService: ProductService) { }
  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
  ngOnInit(): void {
    this.getProducts();
  }
  onSelect(product: any): void {
    this.selectedProduct = product;
  }
}

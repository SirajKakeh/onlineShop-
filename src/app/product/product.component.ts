import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  // template: `
  // <h4 *ngIf="product">Selected Product: <label >{{product.name}}</label></h4>
  // `,
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Input() onSelect;
  @Input() selectedProduct;
  constructor (private productService: ProductService) { }
  ngOnInit() {
  }
  AddToCart(product) {
    this.productService.AddToCart(product);
  }
}

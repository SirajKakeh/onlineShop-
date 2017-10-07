// import required Angular libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// import components paths
import { CartComponent } from './cart/cart.component';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// import services files
import { ProductService } from './product/product.service';
import { SignupService } from './signup/signup.service';

// insert each new component class name in declarations array
// note that by using "ng generate component" or "ng g c"
// Angular automatically adds them
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavbarComponent,
    ProductsListComponent,
    CartComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // define routing paths, path property holds what's displayed in the browser's url
    // component property defines which component to navigate to on this path
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: '',
        component: ProductsListComponent
      }
    ])
  ],
  // each service classname should be added to this array
  providers: [ProductService, SignupService],
  bootstrap: [AppComponent]
})



export class AppModule { }

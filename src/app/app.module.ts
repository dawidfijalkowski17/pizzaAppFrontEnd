import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card/card.component';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { FiltersComponent } from './shoppingcart/filters/filters.component';
import { ProductListComponent } from './shoppingcart/product-list/product-list.component';
import { CartComponent } from './shoppingcart/cart/cart.component';
import { CartItemComponent } from './shoppingcart/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './shoppingcart/product-list/product-item/product-item.component';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './admin/list/list.component';
import { CreateComponent } from './admin/create/create.component';
import { ContactComponent } from './contact/contact.component';
import { FilterPipe } from './shoppingcart/filters/filter.pipe';
import { FilterNamePipe } from './shoppingcart/filters/filter-name.pipe';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { DelieveryComponent } from './delievery/delievery.component';
import { OrderStatusComponent } from './card/order-status/order-status.component';
import { RejectOrderComponent } from './card/reject-order/reject-order.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuListComponent,
    BurgerMenuComponent,
    ShoppingcartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    CartComponent,
    AdminComponent,
    ListComponent,
    CreateComponent,
    ContactComponent,
    FilterPipe,
    FilterNamePipe,
    CardComponent,
    DelieveryComponent,
    OrderStatusComponent,
    RejectOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePayButtonModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '865832044144-ekoq4auel7846g1lvt86j55jmgjucfei.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ShoppingModule } from './shopping/shopping.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutesModule } from './app-routes.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    HeaderComponent
  ],
  imports: [
    AppRoutesModule,
    AuthModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

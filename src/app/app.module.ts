import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutesModule } from './app-routes.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutesModule,
    AuthModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

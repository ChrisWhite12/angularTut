import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingComponent } from './shopping.component';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingEditComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuard],
        component: ShoppingComponent
      },
    ]),
    SharedModule
  ]
})

export class ShoppingModule {}

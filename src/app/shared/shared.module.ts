import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {

}

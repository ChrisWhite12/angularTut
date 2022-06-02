import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') openValue: boolean = false;
  @HostListener('click') toggleOpen() {
    this.openValue = !this.openValue;
  }
}

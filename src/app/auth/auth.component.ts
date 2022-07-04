import { Observable } from 'rxjs';
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: "./auth.component.html"
})

export class AuthComponent {
  isSignup = true
  isLoading = false
  errorState = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSwitchMode() {
    this.isSignup = !this.isSignup
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }

    this.isLoading = true
    const {email, password} = form.value
    let authObservable: Observable<AuthResponseData>;


    if(this.isSignup){
      authObservable = this.authService.signup(email,password)
    }
    else {
      authObservable = this.authService.login(email, password)

    }

    authObservable.subscribe(() => {
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, (errorMessage) => {
      this.isLoading = false
      this.errorState = errorMessage
    })

    form.reset();
  }

}

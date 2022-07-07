import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component'
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: "./auth.component.html"
})

export class AuthComponent implements OnInit, OnDestroy {
  isSignup = true
  isLoading = false
  errorState = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>,
  ){}

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading
      this.errorState = authState.authError
      if(this.errorState){
        this.showError(this.errorState)
      }
    })
  }

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
      // authObservable = this.authService.login(email, password)
      this.store.dispatch(
        new AuthActions.SignInStart({email, password})
      )
    }
    // authObservable.subscribe(() => {
    //   this.isLoading = false
    //   this.router.navigate(['/recipes'])
    // }, (errorMessage) => {
    //   this.errorState = errorMessage
    //   this.showError(errorMessage)
    //   this.isLoading = false
    // })

    form.reset();
  }

  onHandleError() {
    this.errorState = null;
  }

  private showError(message: string) {
    const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer = this.alertHost.viewContainerRef
    hostViewContainer.clear();
    const compRef = hostViewContainer.createComponent(alertFactory);

    compRef.instance.message = message
    this.closeSub = compRef.instance.handleClose.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainer.clear()
    })
  }

  ngOnDestroy(): void {
      if(this.closeSub){
        this.closeSub.unsubscribe()
      }
  }

}

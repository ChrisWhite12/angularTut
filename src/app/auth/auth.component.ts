import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
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
  private storeSub: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>,
  ){}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
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

    const {email, password} = form.value


    if(this.isSignup){
      this.store.dispatch(
        new AuthActions.SignUpStart({email,password})
      )
    }
    else {
      this.store.dispatch(
        new AuthActions.SignInStart({email, password})
      )
    }

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError())
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
      this.storeSub.unsubscribe()
  }
}

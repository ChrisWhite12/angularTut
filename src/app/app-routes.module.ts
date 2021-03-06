import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping',
    loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutesModule {

}

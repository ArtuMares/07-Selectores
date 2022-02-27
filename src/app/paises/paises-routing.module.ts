import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "selector", component: SelectorPageComponent },
      { path: "**", redirectTo: "selector" }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PaisesRoutingModule { }

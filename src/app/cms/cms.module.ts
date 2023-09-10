import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CategoryFormComponent } from './components/category-form/category-form.component'


@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    BasicFormComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CmsModule { }

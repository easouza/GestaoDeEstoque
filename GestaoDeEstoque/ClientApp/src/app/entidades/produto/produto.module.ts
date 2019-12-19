import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { ProdutoComponent } from './produto.component';
import { ProdutoDetailComponent } from './produto-detail.component';
import { ProdutoUpdateComponent } from './produto-update.component';
import { produtoRoute } from './produto.route';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const ENTITY_STATES = [...produtoRoute];

@NgModule({
  imports: [RouterModule.forChild(ENTITY_STATES), CommonModule, MatInputModule,
    FormsModule, ReactiveFormsModule, FontAwesomeModule
  ],
  declarations: [ProdutoComponent, ProdutoDetailComponent, ProdutoUpdateComponent]
})
export class ProdutoModule { }

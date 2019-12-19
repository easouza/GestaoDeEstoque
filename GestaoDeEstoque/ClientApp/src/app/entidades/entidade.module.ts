import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produto',
        loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule)
      }
    ])
  ]
})
export class EntidadeModule {}

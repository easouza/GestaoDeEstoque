import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Produto } from 'src/app/shared/model/produto.model';
import { ProdutoService } from './produto.service';
import { ProdutoComponent } from './produto.component';
import { ProdutoDetailComponent } from './produto-detail.component';
import { ProdutoUpdateComponent } from './produto-update.component';
import { IProduto } from 'src/app/shared/model/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoResolve implements Resolve<IProduto> {
  constructor(private service: ProdutoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Produto>) => response.ok),
        map((produto: HttpResponse<Produto>) => produto.body)
      );
    }
    return of(new Produto());
  }
}

export const produtoRoute: Routes = [
  {
    path: '',
    component: ProdutoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Produtos'
    }
  },
  {
    path: ':id/view',
    component: ProdutoDetailComponent,
    resolve: {
      produto: ProdutoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Produtos'
    }
  },
  {
    path: 'new',
    component: ProdutoUpdateComponent,
    resolve: {
      produto: ProdutoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Produtos'
    }
  },
  {
    path: ':id/edit',
    component: ProdutoUpdateComponent,
    resolve: {
      produto: ProdutoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Produtos'
    }
  }
];

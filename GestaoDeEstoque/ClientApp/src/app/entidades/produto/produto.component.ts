import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProduto } from 'src/app/shared/model/produto.model';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  produtos: IProduto[];
  eventSubscriber: Subscription;

  constructor(
    protected produtoService: ProdutoService
  ) { }

  loadAll() {
    this.produtoService
      .query()
      .pipe(
      filter((res: HttpResponse<IProduto[]>) => res.ok),
      map((res: HttpResponse<IProduto[]>) => res.body)
      )
      .subscribe(
      (res: IProduto[]) => {
        this.produtos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
  }

  trackId(index: number, item: IProduto) {
    return item.id;
  }

  deleteProduto(id: number) {
    this.produtoService.delete(id).subscribe(response => {
      this.loadAll();
    });
  }

  protected onError(errorMessage: string) {

  }
}

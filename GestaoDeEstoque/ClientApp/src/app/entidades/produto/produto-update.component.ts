import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduto, Produto } from 'src/app/shared/model/produto.model';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'jhi-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nome: [],
    quantidade: [],
    valorUnitario: []
  });

  constructor(protected produtoService: ProdutoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ produto }) => {
      this.updateForm(produto);
    });
  }

  updateForm(produto: IProduto) {
    this.editForm.patchValue({
      id: produto.id,
      nome: produto.nome,
      quantidade: produto.quantidade,
      valorUnitario: produto.valorUnitario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const produto = this.createFromForm();
    if (produto.id !== undefined) {
      this.subscribeToSaveResponse(this.produtoService.update(produto));
    } else {
      this.subscribeToSaveResponse(this.produtoService.create(produto));
    }
  }

  private createFromForm(): IProduto {
    return {
      ...new Produto(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      quantidade: this.editForm.get(['quantidade']).value,
      valorUnitario: this.editForm.get(['valorUnitario']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduto>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

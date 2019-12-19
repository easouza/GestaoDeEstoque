import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'src/app/shared/util/request-util';
import { IProduto } from 'src/app/shared/model/produto.model';

type EntityResponseType = HttpResponse<IProduto>;
type EntityArrayResponseType = HttpResponse<IProduto[]>;

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  public resourceUrl: string;

  constructor(protected http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.resourceUrl = baseUrl + 'api/produtos';
  }

  create(produto: IProduto): Observable<EntityResponseType> {
    return this.http.post<IProduto>(this.resourceUrl, produto, { observe: 'response' });
  }

  update(produto: IProduto): Observable<EntityResponseType> {
    return this.http.put<IProduto>(this.resourceUrl, produto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

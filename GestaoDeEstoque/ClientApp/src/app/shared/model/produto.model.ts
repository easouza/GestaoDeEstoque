export interface IProduto {
  id?: number;
  nome?: string;
  quantidade?: number;
  valorUnitario?: number;
}

export class Produto implements IProduto {
  constructor(
    public id?: number,
    public nome?: string,
    public quantidade?: number,
    public valorUnitario?: number) { }
}

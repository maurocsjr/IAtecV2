import { Component } from '@angular/core';
import { Pessoa } from './Pessoa.module';

export class Table {
  public colunas: Array<string>;
  public pessoas: Array<Pessoa>;
  public localEdicao: Component;
  public nomeTabela: string;
}

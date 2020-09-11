import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { Pessoa } from 'src/app/Shared/Pessoa.module';
import { Table } from 'src/app/Shared/Table';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css'],
  providers: [APIService]
})
export class ListaPessoasComponent implements OnInit {
  public dadosTeste: Table;

  constructor(private api: APIService) {
    this.dadosTeste = new Table();
    api
      .getPessoa()
      .then((pessoas: Pessoa[]) => this.preencherTabela(pessoas))
      .catch((reason: any) => console.log('erro ' + reason));
    this.dadosTeste.nomeTabela = 'Lista de Pessoas';
  }

  ngOnInit(): void {}

  preencherTabela(pessoas: Pessoa[]) {
    this.dadosTeste.colunas = ["Nome","Sobrenome","Data de Nasc.","CPF","Tel. Whats","Tel. Cel.","Tel. Fixo","Tel Com.","E-mail","Sexo"];
    this.dadosTeste.pessoas = pessoas;
  }
}

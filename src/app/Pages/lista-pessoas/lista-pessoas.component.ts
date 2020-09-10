import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/Shared/Table';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css'],
})
export class ListaPessoasComponent implements OnInit {
  public dadosTeste: Table;

  constructor() {
    this.dadosTeste = new Table();
    this.dadosTeste.colunas = ['#', 'Nome', 'Tel', 'CPF'];
    this.dadosTeste.linhas = [
      ['7', 'Mauro', '(62) 98535-6262', '086.222.625-55'],
      ['15', 'Bia', '(62) 98535-5050', '086.156.625-55'],
      ['8', 'Julia', '(62) 5552-6262', '086.000.625-55'],
      ['9', 'Carol', '(62) 9998-6262', '125.222.625-55'],
    ];
    this.dadosTeste.nomeTabela = "Cadastro"
  }

  ngOnInit(): void {}
}

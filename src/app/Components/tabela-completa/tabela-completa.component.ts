import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/Shared/Table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-completa',
  templateUrl: './tabela-completa.component.html',
  styleUrls: ['./tabela-completa.component.css']
})
export class TabelaCompletaComponent implements OnInit {
  @Input() tableData: Table;

  @Output() public apagarPessoa = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // console.log(this.tableData.pessoas[0].telefones[0].telefone)
  }

  public editarItem(id: string): void {
    this.router.navigate(['/cadastro', id]);
  }

  public excluirItem(id: string): void {
    this.apagarPessoa.emit(id);
  }

  public formatarData(data: string): string {
    let datan = data.substr(0, 10);
    datan =
      datan.substr(8, 2) + '/' + datan.substr(5, 2) + '/' + datan.substr(0, 4);
    return datan;
  }

  public formataCPF(cpf: string): string {
    return cpf.replace(
      /^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g,
      '$1.$2.$3-$4'
    );
  }

  public formataTel(tel: string): string {
    let newTel: string = tel;
    if (newTel != null) {
      if (newTel.length > 14) {
        newTel = newTel
          .replace('(', '')
          .replace(')', '')
          .replace('-', '')
          .replace(' ', '')
          .replace(/^(\d{2})\D*(\d{5})\D*(\d{4})$/g, '($1) $2-$3');
      } else if (newTel.length === 10) {
        newTel = newTel.replace(/^(\d{2})\D*(\d{4})\D*(\d{4})$/g, '($1) $2-$3');
      } else if (newTel.length === 11) {
        newTel = newTel
          .replace('(', '')
          .replace(')', '')
          .replace('-', '')
          .replace(' ', '')
          .replace(/^(\d{2})\D*(\d{5})\D*(\d{4})$/g, '($1) $2-$3');
      }
    }
    return newTel;
  }
}

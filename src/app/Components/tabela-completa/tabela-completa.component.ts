import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/Shared/Table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-completa',
  templateUrl: './tabela-completa.component.html',
  styleUrls: ['./tabela-completa.component.css'],
})
export class TabelaCompletaComponent implements OnInit {
  @Input() tableData: Table;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public editarItem(id: string): void {
    this.router.navigate(['/cadastro', id]);
  }

  public excluirItem(id: string): boolean {
    
    return true;
  }
}

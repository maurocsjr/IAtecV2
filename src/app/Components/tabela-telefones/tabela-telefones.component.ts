import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormInput } from 'src/app/Shared/FormInput';
import { Telefone } from 'src/app/Shared/Telefone.module';

@Component({
  selector: 'app-tabela-telefones',
  templateUrl: './tabela-telefones.component.html',
  styleUrls: ['./tabela-telefones.component.css']
})
export class TabelaTelefonesComponent implements OnInit {
  public telefonesInput: FormInput = new FormInput();
  @Input() public telefones: Array<Telefone>;

  @Output() public adicionarTels = new EventEmitter();

  constructor() {
    this.telefonesInput.idInput = 'telefone';
    this.telefonesInput.obrigatorio = false;
    this.telefonesInput.rotuloInput = 'Telefone';
    this.telefonesInput.tipoInput = 'text';

    this.telefones = new Array<Telefone>();
    this.telefones = null;
  }

  ngOnInit(): void {}

  setTelefone(value: string) {
    this.telefonesInput.value = value;
  }

  excluirItem(id: number) {
    if (this.telefones.length >= 1) {
      this.telefones.splice(id, 1);
      this.atualizarListaTels();
    }
  }

  adicionarTelefone() {
    let telN = new Telefone();
    if (
      this.telefonesInput.value != undefined &&
      this.telefonesInput.value != null
    ) {
      telN.telefone = this.telefonesInput.value
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(' ', '');
      if (this.telefones == undefined) {
        this.telefones = new Array<Telefone>();
      }
      this.telefones.push(telN);
      this.atualizarListaTels();
      this.telefonesInput.value = ' ';
    }
  }

  atualizarListaTels() {
    this.adicionarTels.emit(this.telefones);
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

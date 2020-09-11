import { Component, OnInit, Output, Input } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';

@Component({
  selector: 'app-form-input-cpf',
  templateUrl: './form-input-cpf.component.html',
  styleUrls: ['./form-input-cpf.component.css']
})
export class FormInputCpfComponent implements OnInit {
  public campo_valido: string = 'is-valid';
  public campo_invalido: string = 'is-invalid';

  public texto_validacao: string;

  @Output() public texto: string;
  @Input() public formInput: FormInput;
  constructor() {
    this.texto = '';
  }

  ngOnInit(): void {
    if (this.formInput.obrigatorio) {
      this.texto_validacao = this.campo_invalido;
    }
    this.adicionarValor();
  }

  public adicionarValor() {
    if (this.formInput.value != '') {
      this.texto = this.formInput.value;
    }
  }

  public textoAltera(texto: Event) {
    this.texto = (<HTMLInputElement>texto.target).value;
    if (this.formInput.obrigatorio) {
      if (this.validarcpf()) {
        this.texto_validacao = this.campo_valido;
      } else {
        this.texto_validacao = this.campo_invalido;
      }
    }
    this.formataCPF();
  }

  public validarcpf() {
    let Soma;
    let Resto;
    let cpf2 = this.texto.replace('.', '').replace('-', '');
    Soma = 0;

    if (cpf2 == '00000000000' || cpf2 == '' || cpf2.length < 11) return false;

    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(cpf2.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf2.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(cpf2.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf2.substring(10, 11))) return false;
    return true;
  }

  public formataCPF() {
    this.texto = this.texto.replace(
      /^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g,
      '$1.$2.$3-$4'
    );
  }
}

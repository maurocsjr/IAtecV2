import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';

@Component({
  selector: 'app-form-input-tel',
  templateUrl: './form-input-tel.component.html',
  styleUrls: ['./form-input-tel.component.css']
})
export class FormInputTelComponent implements OnInit {
  public campo_valido: string = 'is-valid';
  public campo_invalido: string = 'is-invalid';
  public texto_validacao: string;

  public texto: string;
  @Output() valueInput = new EventEmitter<string>();
  @Input() public formInput: FormInput;

  constructor() {
    this.texto = '';
  }

  ngOnInit(): void {
    if (this.formInput.obrigatorio) {
      this.texto_validacao = this.campo_invalido;
    }
    if (this.formInput.value != null) {
      this.adicionarValor();
    }
  }

  enviaAlteracao(): void {
    this.valueInput.emit(this.texto);
  }

  ngDoCheck(): void {
    if (this.formInput.value != null) {
      this.adicionarValor();
    }
  }

  public adicionarValor() {
    if (this.formInput.value != '') {
      this.texto = this.formInput.value;
      this.formataTel();
      this.validaTel();
    }
  }

  public textoAltera(texto: Event) {
    this.texto = (<HTMLInputElement>texto.target).value;
    this.validaTel();
    this.formataTel();
    this.enviaAlteracao();
  }

  public validaTel(): void {
    if (this.formInput.obrigatorio) {
      if (this.texto.length > 9) {
        this.texto_validacao = this.campo_valido;
      } else {
        this.texto_validacao = this.campo_invalido;
      }
    }
  }

  public formataTel() {
    if (this.texto.length > 14) {
      this.texto = this.texto
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(' ', '')
        .replace(/^(\d{2})\D*(\d{5})\D*(\d{4})$/g, '($1) $2-$3');
    } else if (this.texto.length === 10) {
      this.texto = this.texto.replace(
        /^(\d{2})\D*(\d{4})\D*(\d{4})$/g,
        '($1) $2-$3'
      );
    } else if (this.texto.length === 11) {
      this.texto = this.texto
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(' ', '')
        .replace(/^(\d{2})\D*(\d{5})\D*(\d{4})$/g, '($1) $2-$3');
    }
  }
}

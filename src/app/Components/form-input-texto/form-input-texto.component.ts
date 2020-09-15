import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';

@Component({
  selector: 'app-form-input-texto',
  templateUrl: './form-input-texto.component.html',
  styleUrls: ['./form-input-texto.component.css']
})
export class FormInputTextoComponent implements OnInit {
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
      this.adicionaTexto();
    }
  }

  enviaAlteracao(): void {
    this.valueInput.emit(this.texto);
  }

  adicionaTexto(): void {
    this.texto = this.formInput.value;
    this.textoPronto();
  }

  ngDoCheck(): void {
    if (this.formInput.value != null) {
      this.adicionaTexto();
    }
  }

  textoPronto(): void {
    if (this.formInput.obrigatorio) {
      if (this.texto.length > 1) {
        this.texto_validacao = this.campo_valido;
      } else {
        this.texto_validacao = this.campo_invalido;
      }
    }
  }

  public textoAltera(texto: Event) {
    this.texto = (<HTMLInputElement>texto.target).value;
    if (this.formInput.obrigatorio) {
      if (this.texto.length > 1) {
        this.texto_validacao = this.campo_valido;
      } else {
        this.texto_validacao = this.campo_invalido;
      }
    }
    this.enviaAlteracao();
  }
}

import { Component, OnInit, Output, Input } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';

@Component({
  selector: 'app-form-input-select',
  templateUrl: './form-input-select.component.html',
  styleUrls: ['./form-input-select.component.css'],
})
export class FormInputSelectComponent implements OnInit {
  public campo_valido: string = 'is-valid';
  public campo_invalido: string = 'is-invalid';
  public dataInicio: string;

  @Input() public arrays: Array<string>;

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
  }

  public textoAltera(texto: Event) {
    this.texto = (<HTMLInputElement>texto.target).value;
    if (this.formInput.obrigatorio) {
      if (this.texto != '') {
        this.texto_validacao = this.campo_valido;
      } else {
        this.texto_validacao = this.campo_invalido;
      }
    }
  }
}

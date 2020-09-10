import { Component, OnInit, Output, Input } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';

@Component({
  selector: 'app-form-input-data',
  templateUrl: './form-input-data.component.html',
  styleUrls: ['./form-input-data.component.css'],
})
export class FormInputDataComponent implements OnInit {
  public campo_valido: string = 'is-valid';
  public campo_invalido: string = 'is-invalid';
  public dataInicio: string ;

  public texto_validacao: string;

  @Output() public texto: string;
  @Input() public formInput: FormInput;

  constructor() {
    this.texto = '';
    this.colocarDataInicio();
  }

  ngOnInit(): void {
    if (this.formInput.obrigatorio) {
      this.texto_validacao = this.campo_invalido;
    }
  }

  colocarDataInicio() {
    let data = new Date();
    let dia: number = data.getDate();
    let mes: number = data.getMonth() + 1;
    this.dataInicio =
      data.getFullYear().toString() + '-' + (mes<10?("0" + mes.toString()): mes.toString()) + '-' + (dia<10?("0" + dia.toString()): dia.toString());
  }

  public textoAltera(texto: Event) {
    this.texto = (<HTMLInputElement>texto.target).value;
    if (this.formInput.obrigatorio) {
      if (this.validaData) {
        this.texto_validacao = this.campo_valido;
      } else {
        this.texto_validacao = this.campo_invalido;
      }
    }
  }

  public validaData(): boolean {
    var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
    if (!(this.texto.match(RegExPattern) && this.texto != '')) {
      return false;
    } else return true;
  }
}

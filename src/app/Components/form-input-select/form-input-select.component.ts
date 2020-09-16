import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';

@Component({
  selector: 'app-form-input-select',
  templateUrl: './form-input-select.component.html',
  styleUrls: ['./form-input-select.component.css']
})
export class FormInputSelectComponent implements OnInit {
  public campo_valido: string = 'is-valid';
  public campo_invalido: string = 'is-invalid';

  public texto_validacao: string;

  public texto: string;
  @Output() valueInput = new EventEmitter<string>();
  @Input() public formInput: FormInput;
  @Input() public arrays: Array<string>;

  constructor() {
    this.texto = '';
  }

  ngOnInit(): void {
    if (this.formInput.obrigatorio) {
      this.texto_validacao = this.campo_invalido;
    }
    if (this.formInput.value != null) {
      this.selecionar(this.formInput.value);
    }
  }

  ngDoCheck(): void {
    if (this.formInput.value != null && this.formInput.value != this.texto) {
      this.selecionar(this.formInput.value);
    }
  }

  enviaAlteracao(): void {
    this.valueInput.emit(this.texto);
  }

  public selecionar(selecionar: string) {
    let listaSec: Array<string> = [selecionar];
    this.arrays.forEach(element => {
      if (selecionar != element) {
        listaSec.push(element);
      }
    });
    this.arrays = listaSec;
    this.texto = selecionar;
    let inout: HTMLSelectElement = <HTMLSelectElement>(
      document.getElementById(this.formInput.idInput)
    );
    inout.selectedIndex = 1;

    this.validar();
  }

  public textoAltera(texto: Event) {
    this.texto = (<HTMLInputElement>texto.target).value;
    this.validar();
    this.enviaAlteracao();
  }

  validar() {
    if (this.formInput.obrigatorio) {
      if (this.texto != '') {
        this.texto_validacao = this.campo_valido;
      } else {
        this.texto_validacao = this.campo_invalido;
      }
    }
  }
}

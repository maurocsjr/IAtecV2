import { Component, OnInit } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { Pessoa } from 'src/app/Shared/Pessoa.module';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [APIService]
})
export class FormularioComponent implements OnInit {
  public nomeInput: FormInput = new FormInput();
  public sobreNomeInput: FormInput = new FormInput();
  public cpfInput: FormInput = new FormInput();
  public dataNascimentoInput: FormInput = new FormInput();
  public telWhatsInput: FormInput = new FormInput();
  public telCelularInput: FormInput = new FormInput();
  public telFixoInput: FormInput = new FormInput();
  public telComerInput: FormInput = new FormInput();
  public emailInput: FormInput = new FormInput();
  public sexoInput: FormInput = new FormInput();
  public sexos: Array<string> = ['M', 'F'];
  public cadastroId: number;

  constructor(private route: ActivatedRoute, private api: APIService) {
    this.route.params.subscribe(res =>
      res.id != undefined ? (this.cadastroId = res.id) : (this.cadastroId = 0)
    );
    this.nomeInput.idInput = 'nome';
    this.nomeInput.obrigatorio = true;
    this.nomeInput.rotuloInput = 'Nome';
    this.nomeInput.tipoInput = 'text';

    this.sobreNomeInput.idInput = 'sobreNome';
    this.sobreNomeInput.obrigatorio = true;
    this.sobreNomeInput.rotuloInput = 'Sobrenome';
    this.sobreNomeInput.tipoInput = 'text';

    this.dataNascimentoInput.idInput = 'data_nascimento';
    this.dataNascimentoInput.obrigatorio = true;
    this.dataNascimentoInput.rotuloInput = 'Data de Nascimento';
    this.dataNascimentoInput.tipoInput = 'date';

    this.cpfInput.idInput = 'cpf';
    this.cpfInput.obrigatorio = true;
    this.cpfInput.rotuloInput = 'CPF';
    this.cpfInput.tipoInput = 'text';

    this.telWhatsInput.idInput = 'telWhats';
    this.telWhatsInput.obrigatorio = false;
    this.telWhatsInput.rotuloInput = 'Telefone Whatsapp';
    this.telWhatsInput.tipoInput = 'text';

    this.telCelularInput.idInput = 'telCel';
    this.telCelularInput.obrigatorio = true;
    this.telCelularInput.rotuloInput = 'Telefone Celular';
    this.telCelularInput.tipoInput = 'text';

    this.telFixoInput.idInput = 'telFix';
    this.telFixoInput.obrigatorio = false;
    this.telFixoInput.rotuloInput = 'Telefone Fixo';
    this.telFixoInput.tipoInput = 'text';

    this.telComerInput.idInput = 'telComer';
    this.telComerInput.obrigatorio = false;
    this.telComerInput.rotuloInput = 'Telefone Comercial';
    this.telComerInput.tipoInput = 'text';

    this.emailInput.idInput = 'email';
    this.emailInput.obrigatorio = true;
    this.emailInput.rotuloInput = 'Email';
    this.emailInput.tipoInput = 'text';

    this.sexoInput.idInput = 'sexo';
    this.sexoInput.obrigatorio = true;
    this.sexoInput.rotuloInput = 'Sexo';
    this.sexoInput.tipoInput = 'text';
  }

  ngOnInit(): void {
    if (this.cadastroId > 0) {
      this.api
        .getPessoaUma(this.cadastroId)
        .catch((resposta: any) => console.log('erro carregar pessoa'))
        .then((pessoa: Pessoa) => this.preencherDadosEditar(pessoa));
    }
  }

  preencherDadosEditar(pessoa: Pessoa) {
    this.nomeInput.value = 'nome';
    this.sobreNomeInput.value = 'sobreNome';
    this.dataNascimentoInput.value = 'data_nascimento';
    this.cpfInput.value = 'cpf';
    this.telWhatsInput.value = 'telWhats';
    this.telCelularInput.value = 'telCel';
    this.telFixoInput.value = 'telFix';
    this.telComerInput.value = 'telComer';
    this.emailInput.value = 'email';
    this.sexoInput.value = 'sexo';
  }
}

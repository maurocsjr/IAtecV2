import { Component, OnInit } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { Pessoa } from 'src/app/Shared/Pessoa.module';
import { Telefone } from 'src/app/Shared/Telefone.module';

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
  public emailInput: FormInput = new FormInput();
  public sexoInput: FormInput = new FormInput();
  public sexos: Array<string> = ['M', 'F'];
  public telefones: Array<Telefone>;
  public cadastroId: number;
  public atualizar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: APIService,
    private router: Router
  ) {
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

    this.dataNascimentoInput.idInput = 'dataNascimento';
    this.dataNascimentoInput.obrigatorio = true;
    this.dataNascimentoInput.rotuloInput = 'Data de Nascimento';
    this.dataNascimentoInput.tipoInput = 'date';

    this.cpfInput.idInput = 'cpf';
    this.cpfInput.obrigatorio = true;
    this.cpfInput.rotuloInput = 'CPF';
    this.cpfInput.tipoInput = 'text';

    this.emailInput.idInput = 'email';
    this.emailInput.obrigatorio = true;
    this.emailInput.rotuloInput = 'Email';
    this.emailInput.tipoInput = 'text';

    this.sexoInput.idInput = 'sexo';
    this.sexoInput.obrigatorio = true;
    this.sexoInput.rotuloInput = 'Sexo';
    this.sexoInput.tipoInput = 'text';

    if (this.cadastroId > 0) {
      this.api
        .getPessoaUma(this.cadastroId)
        .catch((resposta: any) =>
          console.log('erro carregar pessoa' + resposta)
        )
        .then((pessoa: Pessoa) => this.preencherDadosEditar(pessoa));
      this.atualizar = true;
    }
  }

  ngOnInit(): void {}

  preencherDadosEditar(pessoa: Pessoa) {
    this.nomeInput.value = pessoa.nome;
    this.sobreNomeInput.value = pessoa.sobrenome;
    this.dataNascimentoInput.value =
      pessoa.dataNascimento != null
        ? pessoa.dataNascimento.substr(0, 10)
        : pessoa.dataNascimento;
    this.cpfInput.value = pessoa.cpf;
    this.emailInput.value = pessoa.email;
    this.sexoInput.value = pessoa.sexo;
    this.telefones = pessoa.telefones;
    this.cadastroId = pessoa.id;
  }

  setNome(texto: string) {
    this.nomeInput.value = texto;
  }

  setSobrenome(texto: string) {
    this.sobreNomeInput.value = texto;
  }

  setDataNascimento(texto: string) {
    this.dataNascimentoInput.value = texto;
  }

  setCpf(texto: string) {
    this.cpfInput.value = texto;
  }

  setEmail(texto: string) {
    this.emailInput.value = texto;
  }

  setSexo(texto: string) {
    this.sexoInput.value = texto;
  }

  salvar() {
    this.removerCaracteresDesnecessarios();
    // console.log(
    //   this.nomeInput.value,
    //   this.sobreNomeInput.value,
    //   this.dataNascimentoInput.value,
    //   this.cpfInput.value,
    //   this.emailInput.value,
    //   this.sexoInput.value
    // );
    if (this.verificarDados()) {
      if (this.cadastroId > 0) {
        this.api
          .updatePessoa(
            this.fixarDadosPessoaUpdate(this.cadastroId),
            this.cadastroId
          )
          .then((pessoa: any) => this.router.navigate(['/']))
          .catch((retorno: any) =>
            console.log('Erro ao atualizar: ' + retorno)
          );
      } else {
        this.api
          .setPessoa(this.fixarDadosPessoa())
          .then((pessoa: any) => this.router.navigate(['/']))
          .catch((retorno: any) => console.log('Erro ao salvar: ' + retorno));
      }
    } else {
      alert('Verifique os dados e tente novamente!');
    }
  }

  receberTelefones(telefones: Array<Telefone>) {
    this.telefones = telefones;
  }

  fixarDadosPessoa(): Pessoa {
    let pessoa: Pessoa = new Pessoa();
    pessoa.nome = this.nomeInput.value;
    pessoa.sobrenome = this.sobreNomeInput.value;
    pessoa.dataNascimento = this.dataNascimentoInput.value;
    pessoa.cpf = this.cpfInput.value;
    pessoa.email = this.emailInput.value;
    pessoa.sexo = this.sexoInput.value;
    pessoa.telefones = this.telefones;
    return pessoa;
  }

  fixarDadosPessoaUpdate(id: number): Pessoa {
    let pessoa: Pessoa = new Pessoa();
    pessoa.id = id;
    pessoa.nome = this.nomeInput.value;
    pessoa.sobrenome = this.sobreNomeInput.value;
    pessoa.dataNascimento = this.dataNascimentoInput.value;
    pessoa.cpf = this.cpfInput.value;
    pessoa.email = this.emailInput.value;
    pessoa.sexo = this.sexoInput.value;
    pessoa.telefones = this.telefones;
    return pessoa;
  }

  verificarDados(): boolean {
    let retorno = true;
    if (this.nomeInput.obrigatorio) {
      if (this.nomeInput.value == undefined || this.nomeInput.value == null) {
        retorno = false;
      } else if (this.nomeInput.value.length <= 3) {
        retorno = false;
      }
    }
    if (this.sobreNomeInput.obrigatorio) {
      if (
        this.sobreNomeInput.value == undefined ||
        this.sobreNomeInput.value == null
      ) {
        retorno = false;
      } else if (this.sobreNomeInput.value.length <= 3) {
        retorno = false;
      }
    }
    if (this.dataNascimentoInput.obrigatorio) {
      if (
        this.dataNascimentoInput.value == undefined ||
        this.dataNascimentoInput.value == null
      ) {
        retorno = false;
      } else if (this.dataNascimentoInput.value.length != 10) {
        retorno = false;
      }
    }
    if (this.cpfInput.obrigatorio) {
      if (this.cpfInput.value == undefined || this.cpfInput.value == null) {
        retorno = false;
      } else if (this.cpfInput.value.length != 11) {
        retorno = false;
      }
    }
    if (this.emailInput.obrigatorio) {
      if (this.emailInput.value == undefined || this.emailInput.value == null) {
        retorno = false;
      } else if (this.emailInput.value.length < 11) {
        retorno = false;
      }
    }
    if (this.sexoInput.obrigatorio) {
      if (this.sexoInput.value == undefined || this.sexoInput.value == null) {
        retorno = false;
      } else if (this.sexoInput.value.length != 1) {
        retorno = false;
      }
    }
    if (this.telefones == undefined || this.telefones == null) {
      retorno = false;
    } else if (this.telefones.length < 1) {
      retorno = false;
    }
    return retorno;
  }

  removerCaracteresDesnecessarios(): void {
    this.dataNascimentoInput.value =
      this.dataNascimentoInput.value != null &&
      this.dataNascimentoInput.value != undefined
        ? this.dataNascimentoInput.value.substr(0, 10)
        : this.dataNascimentoInput.value;
    this.cpfInput.value =
      this.cpfInput.value != null && this.cpfInput.value != undefined
        ? this.cpfInput.value.replace('.', '').replace('-', '')
        : this.cpfInput.value;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormInput } from '../../Shared/FormInput';
import { ActivatedRoute, Router } from '@angular/router';
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
      pessoa.data_nascimento != null
        ? pessoa.data_nascimento.substr(0, 10)
        : pessoa.data_nascimento;
    this.cpfInput.value = pessoa.cpf;
    this.telWhatsInput.value = pessoa.telwhats;
    this.telCelularInput.value = pessoa.telcel;
    this.telFixoInput.value = pessoa.telfixo;
    this.telComerInput.value = pessoa.telcom;
    this.emailInput.value = pessoa.email;
    this.sexoInput.value = pessoa.sexo;
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

  setTelWhats(texto: string) {
    this.telWhatsInput.value = texto;
  }

  setTelFixo(texto: string) {
    this.telFixoInput.value = texto;
  }

  setTelCel(texto: string) {
    this.telCelularInput.value = texto;
  }

  setTelComer(texto: string) {
    this.telComerInput.value = texto;
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
    //   this.telWhatsInput.value,
    //   this.telCelularInput.value,
    //   this.telFixoInput.value,
    //   this.telComerInput.value,
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

  fixarDadosPessoa(): Pessoa {
    let pessoa: Pessoa = new Pessoa();
    pessoa.nome = this.nomeInput.value;
    pessoa.sobrenome = this.sobreNomeInput.value;
    pessoa.data_nascimento = this.dataNascimentoInput.value;
    pessoa.cpf = this.cpfInput.value;
    pessoa.telwhats = this.telWhatsInput.value;
    pessoa.telcel = this.telCelularInput.value;
    pessoa.telfixo = this.telFixoInput.value;
    pessoa.telcom = this.telComerInput.value;
    pessoa.email = this.emailInput.value;
    pessoa.sexo = this.sexoInput.value;
    return pessoa;
  }

  fixarDadosPessoaUpdate(id: number): Pessoa {
    let pessoa: Pessoa = new Pessoa();
    pessoa.id = id;
    pessoa.nome = this.nomeInput.value;
    pessoa.sobrenome = this.sobreNomeInput.value;
    pessoa.data_nascimento = this.dataNascimentoInput.value;
    pessoa.cpf = this.cpfInput.value;
    pessoa.telwhats = this.telWhatsInput.value;
    pessoa.telcel = this.telCelularInput.value;
    pessoa.telfixo = this.telFixoInput.value;
    pessoa.telcom = this.telComerInput.value;
    pessoa.email = this.emailInput.value;
    pessoa.sexo = this.sexoInput.value;
    console.log(Pessoa);
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
    if (this.telWhatsInput.obrigatorio) {
      if (
        this.telWhatsInput.value == undefined ||
        this.telWhatsInput.value == null
      ) {
        retorno = false;
      } else if (this.telWhatsInput.value.length < 10) {
        retorno = false;
      }
    }
    if (this.telCelularInput.obrigatorio) {
      if (
        this.telCelularInput.value == undefined ||
        this.telCelularInput.value == null
      ) {
        retorno = false;
      } else if (this.telCelularInput.value.length < 10) {
        retorno = false;
      }
    }
    if (this.telFixoInput.obrigatorio) {
      if (
        this.telFixoInput.value == undefined ||
        this.telFixoInput.value == null
      ) {
        retorno = false;
      } else if (this.telFixoInput.value.length < 10) {
        retorno = false;
      }
    }
    if (this.telComerInput.obrigatorio) {
      if (
        this.telComerInput.value == undefined ||
        this.telComerInput.value == null
      ) {
        retorno = false;
      } else if (this.telComerInput.value.length < 10) {
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
    this.telWhatsInput.value =
      this.telWhatsInput.value != null && this.telWhatsInput.value != undefined
        ? this.telWhatsInput.value
            .replace('(', '')
            .replace(')', '')
            .replace('-', '')
            .replace(' ', '')
        : this.telWhatsInput.value;
    this.telCelularInput.value =
      this.telCelularInput.value != null &&
      this.telCelularInput.value != undefined
        ? this.telCelularInput.value
            .replace('(', '')
            .replace(')', '')
            .replace('-', '')
            .replace(' ', '')
        : this.telCelularInput.value;
    this.telFixoInput.value =
      this.telFixoInput.value != null && this.telFixoInput.value != undefined
        ? this.telFixoInput.value
            .replace('(', '')
            .replace(')', '')
            .replace('-', '')
            .replace(' ', '')
        : this.telFixoInput.value;
    this.telComerInput.value =
      this.telComerInput.value != null && this.telComerInput.value != undefined
        ? this.telComerInput.value
            .replace('(', '')
            .replace(')', '')
            .replace('-', '')
            .replace(' ', '')
        : this.telComerInput.value;
  }
}

import { Telefone } from './Telefone.module';

export class Pessoa {
  public id: number;
  public nome: string;
  public sobrenome: string;
  public dataNascimento: string;
  public telefones: Array<Telefone>;
  public cpf: string;
  public email: string;
  public sexo: string;
}


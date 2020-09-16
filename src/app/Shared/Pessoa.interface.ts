import { Telefone } from './Telefone.module';

export interface PessoaInterface {
  id: number;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  telefones: Array<Telefone>;
  cpf: string;
  email: string;
  sexo: string;
}

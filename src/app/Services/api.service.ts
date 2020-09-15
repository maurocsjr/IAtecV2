import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { URI } from '../Shared/uRI.module';
import { Pessoa } from '../Shared/Pessoa.module';
import { PessoaInterface } from '../Shared/Pessoa.interface';

@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}

  //CRUD
  public getPessoa(): Promise<Pessoa[]> {
    return this.http
      .get(`${URI.uriLocalHost}pessoas`)
      .toPromise()
      .then((resposta: any) => resposta);
  }

  public getPessoaUma(id: number): Promise<Pessoa> {
    let idURI = id > 0 ? '/' + id : '';
    return this.http
      .get(`${URI.uriLocalHost}pessoas${idURI}`)
      .toPromise()
      .then((resposta: any) => resposta);
  }

  public delPessoa(id: number): Promise<Pessoa> {
    let idURI = id > 0 ? '/' + id : '';
    return this.http
      .delete(`${URI.uriLocalHost}pessoas${idURI}`)
      .toPromise()
      .then((resposta: any) => resposta);
  }

  public setPessoa(pessoa: Pessoa): Promise<Pessoa[]> {
    return this.http
      .post<PessoaInterface>(`${URI.uriLocalHost}pessoas`, pessoa)
      .toPromise()
      .then((resposta: any) => resposta);
  }

  public updatePessoa(pessoa: Pessoa, id: number): Promise<Pessoa[]> {
    let idURI = id > 0 ? '/' + id : '';
    return this.http
      .put<PessoaInterface>(`${URI.uriLocalHost}pessoas${idURI}`, pessoa)
      .toPromise()
      .then((resposta: any) => resposta);
  }
}

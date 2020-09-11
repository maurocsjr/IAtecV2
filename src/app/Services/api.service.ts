import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../Shared/Pessoa.module';
import { URI } from '../Shared/uRI.module';

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
}

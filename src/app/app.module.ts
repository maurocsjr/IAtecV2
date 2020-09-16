import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraFundoComponent } from './Components/barra-fundo/barra-fundo.component';
import { BarraTopoComponent } from './Components/barra-topo/barra-topo.component';
import { FormInputCpfComponent } from './Components/form-input-cpf/form-input-cpf.component';
import { FormInputDataComponent } from './Components/form-input-data/form-input-data.component';
import { FormInputSelectComponent } from './Components/form-input-select/form-input-select.component';
import { FormInputTelComponent } from './Components/form-input-tel/form-input-tel.component';
import { FormInputTextoComponent } from './Components/form-input-texto/form-input-texto.component';
import { FormularioComponent } from './Components/formulario/formulario.component';
import { ListaPessoasComponent } from './Pages/lista-pessoas/lista-pessoas.component';
import { TabelaCompletaComponent } from './Components/tabela-completa/tabela-completa.component';
import icons from '../assets/svg/svg-icons';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { BarraLateralComponent } from './Components/barra-lateral/barra-lateral.component';
import { SobreComponent } from './Pages/sobre/sobre.component';
import { HttpClientModule } from '@angular/common/http';
import { TabelaTelefonesComponent } from './Components/tabela-telefones/tabela-telefones.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraFundoComponent,
    BarraTopoComponent,
    FormInputCpfComponent,
    FormInputDataComponent,
    FormInputSelectComponent,
    FormInputTelComponent,
    FormInputTextoComponent,
    FormularioComponent,
    ListaPessoasComponent,
    TabelaCompletaComponent,
    BarraLateralComponent,
    SobreComponent,
    TabelaTelefonesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SvgIconsModule.forRoot({
      icons
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

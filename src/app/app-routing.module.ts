import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { ListaPessoasComponent } from './Pages/lista-pessoas/lista-pessoas.component';
import { FormularioComponent } from './Components/formulario/formulario.component';
import { SobreComponent } from './Pages/sobre/sobre.component';

const routes: Routes = [
  {
    path: '',
    component: ListaPessoasComponent,
  },
  { path: 'cadastro', component: FormularioComponent },
  { path: 'cadastro/:id', component: FormularioComponent },
  { path: 'sobre', component: SobreComponent },
  {
    path: '**',
    component: Pagina404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

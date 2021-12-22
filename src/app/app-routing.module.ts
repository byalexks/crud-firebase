import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';

const routes: Routes = [
  { path: 'cliente/:id', component: NuevoClienteComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

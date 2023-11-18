import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { SesionGuard } from './guards/sesion.guard';
import { AuthGuard } from './guards/auth.guard';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [SesionGuard]},
  { path: "registro", component: RegistroComponent, canActivate: [AuthGuard]},
  { path: "editar-usuario/:id", component: EditarUsuarioComponent, canActivate: [AuthGuard]},
  { path: "lista-usuarios", component: CursosComponent, canActivate: [AuthGuard]},
  { path: "", redirectTo: "lista-usuarios", pathMatch: "full"},
  { path: "**", redirectTo: "lista-usuarios"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

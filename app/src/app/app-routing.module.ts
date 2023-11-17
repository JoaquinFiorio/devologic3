import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { SesionGuard } from './guards/sesion.guard';
import { AuthGuard } from './guards/auth.guard';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent, canActivate: [SesionGuard]},
  { path: "registro", component: RegistroComponent, canActivate: [AuthGuard]},
  { path: "editar-usuario/:id", component: EditarUsuarioComponent, canActivate: [AuthGuard]},
  { path: "cursos-y-talleres", component: CursosComponent, canActivate: [AuthGuard]},
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "**", redirectTo: "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

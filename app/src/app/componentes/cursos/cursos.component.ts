import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  usuarios: any[] = [];
  filtroTexto: string = "";
  usuariosFiltrados: any[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

obtenerUsuarios() {
  this.auth.getUsers()
    .subscribe({
      next: res => {
        this.usuarios = res.slice(1);
      },
      error: err => console.log(err)
    })
  }

  selectedCard(id: string) {
    this.router.navigate(['/editar-usuario', id]);
  }

  buscarUsuario() {
    if (this.filtroTexto !== "") {
      return this.usuariosFiltrados = this.usuarios.filter((usuario) => {
        const hashFiltrado = usuario.email.toLowerCase().includes(this.filtroTexto.toLowerCase());
        const emailFiltrado = usuario.hash.toLowerCase().includes(this.filtroTexto.toLowerCase());

        return hashFiltrado || emailFiltrado;
      });
    } else {
      return this.usuarios;
    }
  }

}

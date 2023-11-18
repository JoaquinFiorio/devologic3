import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {

  id: any;
  usuario: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.auth.getUser(this.id)
        .subscribe({
          next: res => {
            this.usuario = res;
          },
          error : err => console.log(err)
        })
    });
  }

  deleteUsuario(id: string) {
    this.auth.deleteUser(id)
      .subscribe(res => {
        Swal.fire('¡Confirmado!', 'Usuario eliminado con Éxito', 'success');
        this.router.navigate(['/lista-usuarios']);
      })
  }

}

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.deleteUser(id)
        .subscribe(res => {
            Swal.fire('¡Confirmado!', 'Usuario eliminado con Éxito', 'success');
            this.router.navigate(['/lista-usuarios']);
        })
      }
    })
  }

}

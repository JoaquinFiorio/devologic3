import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  usuarios: any[] = []

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.obtenerUsuarios();
}

obtenerUsuarios() {
  this.auth.getUsers()
    .subscribe({
      next: res => {
        this.usuarios = res.slice(1);
        console.log(this.usuarios)
      },
      error: err => console.log(err)
    })
}

}

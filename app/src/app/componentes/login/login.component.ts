import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error = ""

  constructor(private auth: AuthService, private router: Router) {}

  iniciarSesion(formulario:any) {
    const user = {
      email: formulario.value.email,
      password: formulario.value.password,
    }
      this.auth.logIn(user).subscribe({
        next: (res: any) => {
          localStorage.setItem("sk-adi6kngMNY", res.token);

          const storedUser = localStorage.getItem("user");
          if (storedUser !== null) {
            this.auth.user = storedUser;
          }
          this.router.navigate(['/lista-usuarios']);
        },
        error: (err: any) => {
          console.log(err)
          if(err.error.message === "User Not Found"){
            this.error = "Email equivocado"
          }
          if(err.error.message === "Invalid Password"){
            this.error = "Contraseña inválida"
          }
        }
      })
  }

}

//<h5 style="color: red;margin-top:-15px" *ngIf="error === 'Contraseña inválida'">Contraseña no es el correcto</h5>

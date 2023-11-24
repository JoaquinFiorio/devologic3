import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  photoSelected: string | ArrayBuffer | null;
  file: File;
  error: string = "";

  constructor(private auth: AuthService) {
    this.photoSelected = '';
    this.file = new File([], '');
  }

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadUser(email: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action can not be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.createUser(email.value)
        .subscribe({
            next: res => {
              Swal.fire('¡Confirmed!', 'The action was carried out successfully.', 'success');
            },
            error: err => {
              console.log(err)
              if(err.error.message === "Mail ya tiene una cuenta") {
                this.error = 'The email entered is already in use'
              }
            }
        });
      }
    })
  }

}

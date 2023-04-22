import { Component } from '@angular/core';
import { ExitGuard, OnExit } from '../../../guards/exit.guard';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnExit{

  
  onExit(){
    const confirm = Swal.fire({
      title: '¿Desea salir de la página?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false
    });
    return confirm;
  }


}

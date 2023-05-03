import { Component, OnInit } from '@angular/core';
import { ExitGuard, OnExit } from '../../../guards/exit.guard';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnExit, OnInit{

  form: FormGroup = new FormGroup({});
  showPass: Boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ){
    this.builderForm();
  }

  ngOnInit(){
    this.form.valueChanges
    .subscribe({
      next: (v) => console.log('changes->',v)
    })
  }

  builderForm(){
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    });
    console.log(this.form)
  }

  verpass(){
   this.showPass = !this.showPass;
  }

  enviar(){
    if(this.form.valid){
      console.log('Bien');
    }else{
      this.form.markAllAsTouched();
    }
  }

  get userField(){
    return this.form.get('user');
  }
  get passwordField(){
    return this.form.get('password');
  }
  get password2Field(){
    return this.form.get('password2');
  }


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

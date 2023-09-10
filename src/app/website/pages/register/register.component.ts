import { Component, OnInit } from '@angular/core';
import { ExitGuard, OnExit } from '../../../guards/exit.guard';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyValidator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnExit, OnInit{

  form: FormGroup = new FormGroup({});
  showPass: Boolean = false;
  showPass2: Boolean = false;

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
      password: ['', [Validators.required, Validators.minLength(8), MyValidator.validPassword]],
      confirmPassword: ['', [Validators.required]],
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]],
    }, {
      validators: MyValidator.matchPassword
    });
    
    this.typeField?.valueChanges
    .subscribe({
      next: (v) => {
        if(v === 'company'){
          this.companyNameField?.setValidators([Validators.required]);
        }else{
          this.companyNameField?.setValidators(null);
        }
        this.companyNameField?.updateValueAndValidity();
      }
    })
  }

  verpass(){
    this.showPass = !this.showPass;
  }

  verpass2(){
    this.showPass2 = !this.showPass2;
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
  get confirmPasswordField(){
    return this.form.get('confirmPassword');
  }
  get typeField(){
    return this.form.get('type');
  }
  get companyNameField(){
    return this.form.get('companyName');
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

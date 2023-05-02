import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit{

  form: FormGroup = new FormGroup({});

  // form = new FormGroup({
  //   name: new FormControl('', [ Validators.required, Validators.maxLength(10) ]),
  //   email: new FormControl(''),
  //   tel: new FormControl(''),
  //   color: new FormControl('#F01010'),
  //   date: new FormControl(''),
  //   number: new FormControl(''),
  //   area: new FormControl(''),
  //   category  : new FormControl('category-1'),
  //   tag: new FormControl(),
  //   agree: new FormControl(false),
  //   gender: new FormControl(''),
  //   zonas: new FormControl('')
  // });

  // nameField = new FormControl('', [ Validators.required, Validators.maxLength(10) ]);
  // emailField = new FormControl('');
  // telField = new FormControl('');
  // colorField = new FormControl('#F01010');
  // dateField = new FormControl('');
  // numberField = new FormControl('');
  // areaField = new FormControl('');

  // categoryField = new FormControl('category-1');
  // tagField = new FormControl();
  // agreeField = new FormControl(false);
  // genderField = new FormControl('');
  // zonasField = new FormControl('');

  constructor(
    private formBuilder: FormBuilder
  ){
    this.biuldForm();
  }

  ngOnInit(): void {
      // this.nameField?.valueChanges //->>>Esto es un observable que te mantiene atento a los cambios de ese campo
      // .subscribe({
      //   next: (v) => {
      //     console.log('RealtimeValue->',v)
      //   }
      // });

      // this.form.valueChanges
      // .subscribe((value) =>{
      //   console.log('CambiosForm->',value);
      // })
  }

  vervalor(){
    this.agreeField?.valueChanges //->>>Esto es un observable que te mantiene atento a los cambios de ese campo
      .subscribe({
        next: (v) => {
          console.log('agreeField->',v)
        }
      });
  }

  private biuldForm(){
    this.form = this.formBuilder.group({
      fullname: this.formBuilder.group({
        name: [ '', [ Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/) ] ],
        last: [ '', [ Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/) ] ],
      }),
      email: [ '', [Validators.required,Validators.email] ],
      tel: [ '', [Validators.required, Validators.minLength(11), Validators.maxLength(11)] ],
      color: [ '#F01010' ],
      date: [ '', Validators.required ],
      number: [ '18', [Validators.required, Validators.min(18), Validators.max(100)] ],
      area: [ '' ],
      category  : [ '' ],
      tag: [ ],
      agree: [ false, [Validators.requiredTrue] ],
      gender: [ '' ],
      zonas: [ '' ]
    });
  }

  save(event:any){
    if(this.form.valid){
      console.log(this.form.value);
      console.log(this.form.valid);
    }else{
      this.form.markAllAsTouched();
    }
  }

  getNameValue(){
    console.log('Value->',this.nameField?.value);
  }

  get nameField(){
    return this.form.get('fullname.name');
  }

  get lastField(){
    return this.form.get('fullname.last');
  }

  get emailField(){
    return this.form.get('email');
  }

  get telField(){
    return this.form.get('tel');
  }

  get colorField(){
    return this.form.get('color');
  }

  get dateField(){
    return this.form.get('date');
  }

  get numberField(){
    return this.form.get('number');
  }

  get areaField(){
    return this.form.get('area');
  }

  get categoryField(){
    return this.form.get('category');
  }

  get tagField(){
    return this.form.get('tag');
  }

  get agreeField(){
    return this.form.get('agree');
  }

  get zonasField(){
    return this.form.get('zonas');
  }

  get genderField(){
    return this.form.get('gender');
  }

  get isNameFiledValid(){
    return this.nameField?.touched && this.nameField.valid;
  }

  get isNameFiledInvalid(){
    return this.nameField?.touched && this.nameField.invalid;
  }
}

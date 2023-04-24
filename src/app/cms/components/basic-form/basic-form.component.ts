import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit{
  
  nameField = new FormControl('');
  emailField = new FormControl('');
  telField = new FormControl('');
  colorField = new FormControl('#F01010');
  dateField = new FormControl('');
  numberField = new FormControl('');
  areaField = new FormControl('');

  categoryField = new FormControl('category-1');
  tagField = new FormControl();

  constructor(){

  }

  ngOnInit(): void {
      this.nameField.valueChanges //->>>Esto es un observable que te mantiene atento a los cambios de ese campo
      .subscribe({
        next: (v) => {
          console.log('RealtimeValue->',v)
        }
      });
  }

  getNameValue(){
    console.log('Value->',this.nameField.value);
  }
}

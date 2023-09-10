import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  
  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder : FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: Storage
  ){
    this.builderForm();
  }

  ngOnInit(): void {
    this.getImages();
  }

  builderForm(){
    this.form = this.formBuilder.group({
      name: [ '', [Validators.required] ],
      image: [ '', [Validators.required] ],
    });
  }

  get nombreField(){
    return this.form.get('name');
  }

  get imageField(){
    return this.form.get('image');
  }

  saveCategory(){
    if(this.form.valid){
      this.createCategory();
    }else{
      this.form.markAllAsTouched();
    }
  }
  
  private createCategory(){
    const data = this.form.value;
    this.categoriesService.createCategory(data)
    .subscribe({
      next: (v) => {
        Swal.fire({
          title: 'Categoría creada correctamente',
          icon: 'success'
        });
        this.router.navigate(['./cms']);
      }
    });
  }

  uploadFile(event: any){
    const image = event.target.files[0];
    const name = image.name;
    const fileRef = ref(this.storage, `images/${name}`);
    uploadBytes(fileRef, image)
    .then(response => {
      getDownloadURL(response.ref).then(img => {
        this.form.patchValue({
          image: img.toString()
        });
      });
    })
    .catch(error => console.log(error));
  }

  getImages(){
    const imagesRef = ref(this.storage, 'images');
    listAll(imagesRef)//Metodo de fire para obtener las imagenes de una referencia
    .then(response => {
      console.log('dataconsultaimg->',response)
      // for(let item of response){}
      response.items.map(item => {
        // const url = getDownloadURL(item);
        // getDownloadURL(item).then(img => {
        //   this.form.patchValue({
        //     urlImage: img.toString()
        //   });
        // });
        // console.log('url', url);
        // url.catch(img => console.log(img))
      })
    })
    .catch(error => console.log(error));
  }
}

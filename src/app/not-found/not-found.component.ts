import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit{

  constructor(
    private router: Router
  ){

  }

  ngOnInit(): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Page not found',
    }).finally( () =>{
      this.cerrar();
    } )
  }

  cerrar(){
    this.router.navigate(['/home']);
  }

}

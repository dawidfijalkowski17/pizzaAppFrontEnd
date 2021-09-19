import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzaAddService } from './pizza-add.service'



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  credentials = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: ['', [Validators.required, Validators.minLength(1)]],
    urlAdress: ['', [Validators.required, Validators.minLength(1)]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private pizzaAddService: PizzaAddService, 
    private router: Router
     ) { }

  ngOnInit(): void {

  }
  createPizza() {
    const pizzaData = {
      name: this.credentials.controls.name.value,
      description: this.credentials.controls.description.value,
      price: this.credentials.controls.price.value,
      urlAdress: this.credentials.controls.urlAdress.value      
    };
    this.pizzaAddService.addPizza(pizzaData).subscribe((res) => {

    }, (err) => {

    });

    this.router.navigate(['home/admin/list'])


  }
}

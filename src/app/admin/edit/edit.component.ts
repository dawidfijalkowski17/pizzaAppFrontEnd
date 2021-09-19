import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessangerService } from 'src/app/services/messanger.service';
import { PizzaEditService } from './pizza-edit.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private id: string = '';
  pizzas: any;


  credentials: any;

  constructor(
    private formBuilder: FormBuilder,
    private pizzaEditService: PizzaEditService,
    private router: Router,
    private messangerService: MessangerService
  ) { }

  ngOnInit(): void {
    this.id=this.messangerService.getId();
    this.pizzaEditService.getSelected(this.id).subscribe(
      (res)=>{
        this.pizzas=res;
        this.createForm();
      },
      async(err)=>{
        console.log('Nie udalo sie pobrac pizzy')
      }
    )
  }

  private createForm(){
    this.credentials = this.formBuilder.group({
      name: [this.pizzas.name, [Validators.required, Validators.minLength(3)]],
      description: [this.pizzas.description, [Validators.required, Validators.minLength(5)]],
      price: [this.pizzas.price, [Validators.required, Validators.minLength(1)]],
      urlAdress: [this.pizzas.urlAdress, [Validators.required, Validators.minLength(1)]]
    })
  }

  submit(){
    const pizzaData = {
      name: this.credentials.controls.name.value,
      description: this.credentials.controls.description.value,
      price: this.credentials.controls.price.value,
      urlAdress: this.credentials.controls.urlAdress.value
    };
    this.pizzaEditService.editPizza(pizzaData, this.id).subscribe((res) => {

    }, (err) => {

    });
    this.router.navigate(['home/admin/list'])

  }


}
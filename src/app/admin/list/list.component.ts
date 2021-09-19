import { Component, OnInit } from '@angular/core';
import { PizzaService } from './pizza.service';
import { Pizza } from 'src/app/models/pizza';
import {MessangerService } from 'src/app/services/messanger.service'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pizzas: Pizza[]=[];
  selectedPizzaId!: string;
  isEdit = false;

  constructor(
    private pizzaService: PizzaService,
    private messangerService: MessangerService
  ) { }

  ngOnInit() {
    this.getPizzaList();
  }

  private getPizzaList() {
  this.pizzaService.getAllPizzas().subscribe(
    (res)=>{
      this.pizzas=res;
    },
    async(err)=>{
      console.log('Nie udalo sie pobrac listy pizzy')
    }
  )
  };

  delete(id: any){
    this.pizzaService.deletePizza(id).subscribe(
      () => this.getPizzaList(),
      () => this.getPizzaList(),
      () => this.getPizzaList()
    );
  }

  getPizzaId(id:any){
    this.messangerService.sendId(id)
  } 

}
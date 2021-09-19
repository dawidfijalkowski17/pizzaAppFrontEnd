import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  isEnable: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isAdmin.subscribe((res) => {
      this.isEnable = res;
    })
  }

}

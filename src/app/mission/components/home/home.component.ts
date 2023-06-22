import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/account/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
constructor(private service: ServicesService) { }

ngOnInit(): void { 
}
logout(){
  this.service.logoutService();
}

}

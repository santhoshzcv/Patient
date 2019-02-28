import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private service:ServiceService) { }

  registerData={}

  ngOnInit() {
  }

  register(value:any){
    console.log(value);
    this.service.registerUser(value).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate(['/login']);
    })
  
  }

}

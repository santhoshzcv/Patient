import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {}
  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit() {
  }
  login(data: any) {
    console.log(data);
    this.service.loginUser(data).subscribe((res: any) => {
      if (res.success == false) {
        console.log(res.message);
      } else if (res.success == true) {
        console.log(res.message);
        this.router.navigate(["dashboard"]);
      }
    })
  }
}

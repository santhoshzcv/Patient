import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  constructor(private http:HttpClient) { }

  registerUser(data){
    return  this.http.post("http://localhost:4000/api/users",data);
  }
  loginUser(data){
    return this.http.post("http://localhost:4000/api/login",data);
  }
  patientdata(data){
    return this.http.post("http://localhost:4000/api/patientdata",data);
  }
  getpatientdata(){
    return this.http.get("http://localhost:4000/api/getpatientdata");
  }
  getsinglepatientdata(data){
    return this.http.get("http://localhost:4000/api/singlepatient/"+`${data}`);
  }

}

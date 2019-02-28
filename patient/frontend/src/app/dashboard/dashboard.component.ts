import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patient: Patient = new Patient();
  patientdata=[];
  singlepatient={}
  patientForm:FormGroup;

  constructor(private fb: FormBuilder, private service: ServiceService) { 
    this.patientForm = this.fb.group({
      _id: [this.patient._id,  Validators.required],
      name: [this.patient.name, Validators.required],
      dob: [this.patient.dob, Validators.required],
      address: [this.patient.address,Validators.required],
      phoneno: [this.patient.phoneno,Validators.required],
      bloodgroup: [this.patient.bloodgroup,Validators.required],
  
      hospitalname: [this.patient.hospitalname,Validators.required],
      doctorname: [this.patient.doctorname,Validators.required],
      visitdate: [this.patient.visitdate,Validators.required],
      diseasename: [this.patient.diseasename,Validators.required],
  
      paymentbillnumber: [this.patient.paymentbillnumber,Validators.required],
      paymentmode: [this.patient.paymentmode,Validators.required],
      amountpaid: [this.patient.amountpaid,Validators.required],
  
    });
  }


  ngOnInit() {
    this.getpatientdata();
  }

  patientDetails() {
    console.log(this.patientForm.value);
    this.service.patientdata(this.patientForm.value).subscribe((res: any) => {
      console.log(res.message)
      swal("status"+res.message)
      this.patientForm.reset();
      this.getpatientdata();
    })
  }

  getpatientdata(){
    this.service.getpatientdata().subscribe((res:any)=>{
      this.patientdata=res.patientdata;
    })
  }

  popmodel(id){
    console.log(id);
    this.service.getsinglepatientdata(id).subscribe((res:any)=>{
       console.log(this.singlepatient=res.patientdata);
       console.log(this.singlepatient);
    })
  }


}

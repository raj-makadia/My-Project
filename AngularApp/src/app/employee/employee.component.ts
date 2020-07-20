import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import{EmployeeService} from '../shared/employee.service'
import { from } from 'rxjs';
import {Employee} from '../shared/employee.model'
import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';

declare var M:any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
  if(form)
  form.reset();
  this.employeeService.selectedEmployee= {
    emp_id:"",
    emp_name:"",
    emp_code:"",
    emp_salary:null,
  }
  }

  onSubmit(form:NgForm){
    if(form.value.emp_id != "select emp_id from employeedb")

    this.employeeService.postEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({html: "Saved successfully", class:'rounded'})
    });

    else{
      this.employeeService.putEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: "Updated successfully", classes:'rounded'})
      })
    }
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=> {;
    this.employeeService.employees = res as Employee[];
  });
}

onEdit(emp : Employee){
  this.employeeService.selectedEmployee=emp;
}

onDelete(emp_id:string,form:NgForm){
  if(confirm("Are You sure to delete this record ?") == true){
this.employeeService.deleteEmployee(emp_id).subscribe((res) => {
  this.refreshEmployeeList();;
  this.resetForm(form);
  M.toast({html:'Deleted Successfully',classes:'rounded'})
})
  }

}

}

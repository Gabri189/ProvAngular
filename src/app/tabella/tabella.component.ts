import { Component, OnInit } from '@angular/core';
import { Employee } from './employeeInterface';
import { GetEmployeesService } from "../get-employees.service";

@Component({
    selector: 'app-tabella',
    templateUrl: './tabella.component.html',
    styleUrls: ['./tabella.component.css']
})

export class TabellaComponent
{
    ges : GetEmployeesService;
    array : Employee[];

    constructor(ges : GetEmployeesService) 
    {
        this.ges = ges;
        this.array = [];

        this.loadEmployees();
    }

    prompt(message : string) : any
    {
        return window.prompt(message);
    }

    loadEmployees() : void
    {
        this.ges.getData("http://localhost:8080/api/tutorial/1.0/employees")
            .subscribe(data => this.array = data);
    }

    addNewEmployee(firstName : string, lastName : string, email : string, phone : string) : void
    {
        let emp : Employee = {
			      employeeId: Math.floor(Math.random() * 1000000),
			      firstName: firstName,
			      lastName: lastName,
			      email: email,
			      phone: phone
		    };
    }
}

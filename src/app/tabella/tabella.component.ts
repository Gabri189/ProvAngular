import { Component, OnInit } from '@angular/core';
import { GetEmployeesService } from "../get-employees.service";
import { Employee } from './employeeInterface';

@Component({
    selector: 'app-tabella',
    templateUrl: './tabella.component.html',
    styleUrls: ['./tabella.component.css']
})

export class TabellaComponent
{
    generaID: number;
    ges : GetEmployeesService; //var del tipo della classe passata tramite import { GetEmployeesService } from "../get-employees.service";
    array : Employee[]; //array di impiegati (import { Employee } from './employeeInterface';)
    idCanc: number[] = []; //array per memorizzare temporaneamente gli ID degli impiegati che si vogliono modificare/cancellare

    constructor(ges : GetEmployeesService) 
    {
        this.generaID = 0;
        this.ges = ges;
        this.array = [];
        this.load();
        this.removeStandardValues();
    }

    load() : void //metodo che carica dati tramite metodo GET alla url delle API
    {
        this.ges.getData("http://localhost:4200/api/tutorial/1.0/employees")
            .subscribe(data => this.array = data);
    }

    removeStandardValues() : void //metodo che rimuove i valori standard del database (semplicemente per bellezza)
    {
        this.remove(1);
        this.remove(2);
        this.remove(3);
    }

    add(firstName : string, lastName : string, email : string, phone : string) : void
    {
        let emp : Employee = { //variabile temporanea (type let) di tipo Employee con la quale inserisco i dati del nuovo impiegato
			      employeeId: this.createID(),
			      firstName: firstName,
			      lastName: lastName,
			      email: email,
			      phone: phone
		};
        this.ges.postData("http://localhost:4200/api/tutorial/1.0/employees", emp) //metodo che inserisce nuovi dati con metodo POST
            .subscribe(data => this.load());
    }

    remove(id : number) : void
    {
        this.ges.deleteData("http://localhost:4200/api/tutorial/1.0/employees/" + id)
            .subscribe(data => this.load());
    }

    modify(id : number, firstName : string, lastName : string, email : string, phone : string) : void
    {
        let emp : Employee = {
			employeeId: id,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone
		};

        this.ges.putData("http://localhost:4200/api/tutorial/1.0/employees/" + id, emp)
            .subscribe(data => this.load());
    }

    message(message : string) : any //metodo richiamato da tag in html per aggiungere un parametro
    {
        return window.prompt(message);
    }

    private createID() : number 
    {
        return this.generaID++;
    }
}
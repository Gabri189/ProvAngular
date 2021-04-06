import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from './tabella/employeeInterface';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  	providedIn: 'root'
})

export class GetEmployeesService 
{
	constructor(private http : HttpClient) {}
	
	getData(apiUrl : string) : Observable <Employee[]>
	{
      return this.http.get<Employee[]>(apiUrl)
          .pipe(
            retry(1),
            catchError(this.handleError)
          );
	}

  public handleError(handleError: any): import("rxjs").OperatorFunction<Employee[], any> 
  {
      throw new Error('Method not implemented.');
  }
}

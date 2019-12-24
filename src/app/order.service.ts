
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Products, Orders } from './products';
import { tap, catchError } from 'rxjs/operators';


@Injectable()
export class OrderService {

  private _url: string = "http://localhost:5000/";
  private httpOptions = {
	  headers: new HttpHeaders({
	    'Content-Type':  'application/json'
	  })
	};

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this._url+'products')
        .pipe(tap(data => JSON.stringify(data)) , catchError(this.errorHandler))
  }

  getOrders(): Observable<Orders[]>{
    return this.http.get<Orders[]>(this._url+'orders')
        .pipe(tap(data => JSON.stringify(data)) , catchError(this.errorHandler))
  }

  createOrder(data: Orders): Observable<Orders[]>{
    // console.log('create order-->',data);
    return this.http.post<Orders[]>(this._url+'order', data, this.httpOptions)
        .pipe(tap(data => JSON.stringify(data)) , catchError(this.errorHandler))
  }

  updateOrder(data: Orders): Observable<Orders[]>{
    // console.log('create order-->',data);
    return this.http.put<Orders[]>(this._url+'order/'+data._id, data, this.httpOptions)
        .pipe(tap(data => JSON.stringify(data)) , catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }

}

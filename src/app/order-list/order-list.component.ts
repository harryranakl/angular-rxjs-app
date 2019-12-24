import { Component, OnInit } from '@angular/core';
import { OrderService } from './../order.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms'; 

@Component({
  selector: 'order-list',
  template: `
    <div class="container">
       <h4>{{errorMsg}}</h4>
       <h2>create order</h2>
       <form [formGroup]="loginForm" class="order-container" (ngSubmit)="submit()">
         <p>choose product</p>
         <ul *ngFor="let p of products; let i=index">
            <li>
               title: {{p.title}} -> 
               <input [(ngModel)]="checkboxFlag" type="checkbox" formControlName="prodPick{{i}}" value="{{i}}"/>
               <input type="text" placeholder="enter quantity" formControlName="prodQuant{{i}}" value=""/>
            </li>
         </ul>
         <p [ngClass]="{ 'has-error': isSubmitted && formControls.firstName.errors }">
            <input type="text" placeholder="first Name" formControlName="firstName">
         </p>
         <div *ngIf="isSubmitted && formControls.firstName.errors" class="help-block">
            <div *ngIf="formControls.firstName.errors.required">firstName is required</div>
         </div>
         <p [ngClass]="{ 'has-error': isSubmitted && formControls.address.errors }">
            <input type="text" placeholder="Address" formControlName="address">
         </p>
         <div *ngIf="isSubmitted && formControls.address.errors" class="help-block">
            <div *ngIf="formControls.address.errors.required">address is required</div>
         </div>
         <p>
            <button class="btn btn-submit" type="submit">create order</button>
         </p>
         <p>
            status -> {{resp.message}}
         </p>
       </form>
    </div>
  `,
  // styles: []
  styleUrls: ['./../order-detail/order-detail.component.scss']
})
export class OrderListComponent implements OnInit {
  
  loginForm: FormGroup;
  isSubmitted  =  false;

  public resp = {message :''};
  public products = [];
  public errorMsg;
  constructor(private _orderService: OrderService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      prodPick0: ['1', ''],
      prodQuant0: ['1', ''],
      prodPick1: ['1', ''],
      prodQuant1: ['1', ''],
    });

    this._orderService.getProducts()
      .subscribe(data => this.products = data,
                error => this.errorMsg = error);
  }

  get formControls() { return this.loginForm.controls; }  

  submit(){
    this.isSubmitted = true;  
    
    if(this.loginForm.valid){
      // console.log(this.loginForm.value);
      this.resp.message = 'order in progress!!!';
      
      let params = {
            "user": this.loginForm.value.firstName,
            "deliveryAddress": this.loginForm.value.address,
            "items": [
                {
                    "title": "camera",
                    "quantity": this.loginForm.value.prodQuant0
                },
                {
                    "title": "phone",
                    "quantity": this.loginForm.value.prodQuant1
                }
            ]
        };

      this._orderService.createOrder(params)
      .subscribe(data => {
        
        // console.log('create order response->',data);
        if(!data.message){

          if(data[0].status == 'confirmed'){
            const o ={
              "_id" : data[0]._id,
              "status" : data[0].status,
            }
            this._orderService.updateOrder(o)
                .subscribe(data => {
                  console.log('update order response->',data);
                  this.resp.message = 'order dilvered successfully!!!';
                  this.orders = data;
                  // console.log('send order response->',this.resp);
                },
                error => this.errorMsg = error);
          }else{
            this.resp.message ='order declined!!!';
            this.orders = data;
            // console.log('send order response->',this.resp);
          }

        }else{
          
          this.resp.message ='kindly try again, order not created successfully!!!';
          this.orders = data;
          // console.log('send order response->',this.resp);
        }
        
        },
        error => this.errorMsg = error);
      return true;
    }else{
      return false;
    }
  }



}

import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-detail',
  template: `
    <div class="container">
    <h2>Recent Orders Details</h2>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-2">Order No:</div>
        <div class="col col-1">Address</div>
        <div class="col col-3">Total Amount</div>
        <div class="col col-4">Payment Status</div>
      </li>

      <li class="table-row" *ngFor="let o of orders">
        <div class="col col-2" data-label="">
          {{o._id}}
          <div *ngFor="let i of o.items">
            -> title:{{i.title}} <br> description:{{i.description}} <br> price:{{i.price}} <br> quantity:{{i.quantity}}
          </div>
        </div>
        <div class="col col-1" data-label="">{{o.deliveryAddress}}</div>
        <div class="col col-3" data-label="">{{o.totalAmount}}</div>
        <div class="col col-4" data-label="">
        {{o.status}}
        <p>
        <button class="btn btn-submit" type="submit" (click)="cancelOrder(o._id)">cancel order</button>
        </p>
        </div>
      </li>
      
    </ul>
  </div>
  `,
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public orders = [];
  public errorMsg;
  
  constructor(private _orderService:OrderService) { }

  ngOnInit() {
    const me = this;
    // setInterval(function(){
    me._orderService.getOrders()
      .subscribe(data => me.orders = data,
        error => me.errorMsg = error);
    // },5000);
        
  }

  refreshOrders() {
    console.log('refresh orders->');
    this._orderService.getOrders()
      .subscribe(data => this.orders = data,
        error => this.errorMsg = error);
        
  }

  cancelOrder(orderId) {
    const o = {
      "_id":orderId,
      "status":"cancelled"
    }
    // console.log('cancel order->',o);

    this._orderService.updateOrder(o)
      .subscribe(data => {
        // this.orders = data;
        this.refreshOrders();
      },
        error => this.errorMsg = error);
        
  }

}

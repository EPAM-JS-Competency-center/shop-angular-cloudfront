import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { OrdersComponent } from './orders.component';
import { OrdersService } from './orders.service';

const ORDERS_SERVICE_MOCK: Pick<OrdersService, 'getOrders'> = {
  getOrders: () => of([]),
};

describe('ManageOrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      providers: [{ provide: OrdersService, useValue: ORDERS_SERVICE_MOCK }],
      declarations: [OrdersComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/**
 * import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Observable } from 'rxjs';
import { Order } from './order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  readonly columns = ['from', 'count', 'address', 'status', 'action'];

  orders$!: Observable<Order[]>;

  constructor(private readonly ordersService: OrdersService) {}

  ngOnInit(): void {
    this.orders$ = this.ordersService.getOrders();
  }
}

 */

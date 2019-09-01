import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { RadioOption } from '../shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  delivery: number = 8

  orderId: string 

  emailPatern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
     
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur'
      }),
        email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPatern)]),
        emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPatern)]),
        address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        number: this.formBuilder.control('', [Validators.required]),
        optionalAddress: this.formBuilder.control(''),
        paymentOption: this.formBuilder.control('', [Validators.required])
    }, { validators: [OrderComponent.equalsTo], updateOn: 'change' })
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation) {
      return undefined
    }
    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }
    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
      this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = orderId
      }))
      .subscribe((orderId: string) => {
      this.router.navigate(['/order-summary'])
      console.log(`Compra concluída ${orderId}`)
      this.orderService.clear()
    })
    console.log(order)
  }

  keyPress(event: any) {
    //na view é utilizado 
    //<input type="text" (keypress)="keyPress($event)">
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

}

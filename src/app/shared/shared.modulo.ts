import { AuthInterceptor } from './../security/login/auth.intercepltor';
import { LeaveOrderGuard } from './../order/leave-order.guard';

import { LoginService } from './../security/login/login.service';
import { OnlyNumberDirective } from './only-number.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { RatingComponent } from './rating/rating.component';
import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderService } from '../order/order.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { LoggedInGuard } from '../security/loggedin.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, OnlyNumberDirective, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent, CommonModule,
        FormsModule, ReactiveFormsModule, OnlyNumberDirective, SnackbarComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService,
                        RestaurantsService,
                        OrderService,
                        NotificationService,
                        LoginService,
                        LoggedInGuard,
                        LeaveOrderGuard,
                        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}]
        }
    }

}
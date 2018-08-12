var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { from } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
var RestaurantsComponent = /** @class */ (function () {
    function RestaurantsComponent(restaurantsService, formBuilder) {
        this.restaurantsService = restaurantsService;
        this.formBuilder = formBuilder;
        this.searchBarState = 'hidden';
    }
    RestaurantsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchControl = this.formBuilder.control('');
        this.searchForm = this.formBuilder.group({
            searchControl: this.searchControl,
            vin: this.vin
        });
        this.searchControl.valueChanges
            .pipe(debounceTime(500), //500 milisegundos para realizar nova pesquisa
        distinctUntilChanged(), // não deixa repetir a mesma query novamente
        /* .do(searchTerm => console.log(`q=${searchTerm}`)) */ //somente para vericar a digitação no console
        switchMap(function (searchTearm) { return _this.restaurantsService
            .restaurants(searchTearm)
            .pipe(function (catchError) { return from([]); }); }) //evita que o erro de rede quebre o valueChanges)
        ).subscribe(function (restaurants) { return _this.restaurants = restaurants; });
        this.restaurantsService.restaurants()
            .subscribe(function (restaurants) { return _this.restaurants = restaurants; });
    };
    RestaurantsComponent.prototype.toggleSeach = function () {
        this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
    };
    RestaurantsComponent = __decorate([
        Component({
            selector: 'mt-restaurants',
            templateUrl: './restaurants.component.html',
            animations: [
                trigger('toggleSearch', [
                    state('hidden', style({
                        opacity: 0,
                        "max-height": "0px"
                    })),
                    state('visible', style({
                        opacity: 1,
                        "max-height": "70px",
                        "margin-top": "20px"
                    })),
                    transition('* => *', animate('300ms 0s ease-in-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [RestaurantsService, FormBuilder])
    ], RestaurantsComponent);
    return RestaurantsComponent;
}());
export { RestaurantsComponent };
//# sourceMappingURL=restaurants.component.js.map
import { switchMap, tap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from './restaurants.service'
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
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
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  searchForm: FormGroup
  searchControl: FormControl
  vin: FormControl

  restaurants: Restaurant[]

  constructor(public restaurantsService: RestaurantsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl,
      vin: this.vin
    })

    this.searchControl.valueChanges
      .pipe(
      debounceTime(500), //500 milisegundos para realizar nova pesquisa
      distinctUntilChanged(),// não deixa repetir a mesma query novamente
      /* .do(searchTerm => console.log(`q=${searchTerm}`)) */ //somente para vericar a digitação no console
      switchMap(searchTearm => this.restaurantsService
        .restaurants(searchTearm)
        .pipe(catchError => from([])))//evita que o erro de rede quebre o valueChanges)
      ).subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSeach() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}

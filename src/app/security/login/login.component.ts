import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './../../shared/messages/notification.service';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailPatern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: "juliana@gmail.com",//this.fb.control('', [Validators.required, Validators.pattern(this.emailPatern)]),
      password: "juliana23",//this.fb.control('', [Validators.required])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => this.notificationService.notify(`Bem vindo, ${user.name}`),
        response => // HttpErrorResponse
          this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate([atob(this.navigateTo)])
        })
  }
}


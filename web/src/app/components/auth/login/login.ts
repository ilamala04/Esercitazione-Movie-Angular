import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from
'@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../auth';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
 })
 export class Login implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  loginForm: FormGroup;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: Auth,
    private router: Router
  ) 
  
  {
  this.loginForm = this.formBuilder.group({
  username: [''],
  password: ['']
  });
  }

  ngOnInit(): void {
  this.returnUrl = this.activatedRoute
  .snapshot
  .queryParams['returnUrl'] || '/';
  }

  onLogin(): void {
    this.subscription.add(
    this.authService
    .login(
    this.loginForm.value.username,
    this.loginForm.value.password
    ).subscribe({
    next: response => {
    localStorage.setItem(
    'token',
    response['key' as keyof typeof response]
    );
    this.router.navigateByUrl(this.returnUrl);
    this.loginForm.reset();
    },
    error: (e: HttpErrorResponse) => {
    console.log(`Error: ${e}`);
    }
    })
    );
    }
    ngOnDestroy(): void {
    this.subscription.unsubscribe();
    }
 }
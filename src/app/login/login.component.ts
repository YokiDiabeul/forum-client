import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MyToastService } from '../_services/toast.service';
import { first } from 'rxjs/operators';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toast: MyToastService) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.toast.toastWaiting('Connection...');
    this.authenticationService.login(this.model.usernameOrEmail, this.model.password)
      .pipe(first())
      .subscribe(data => {
        this.toast.closeAll();
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.toast.closeAll();
        this.toast.errorMsg(error, 'Login');
      }
    );
  }
}

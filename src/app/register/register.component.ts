import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { MyToastService } from "../_services/toast.service";
import { SignupRequest } from "../_dto/request/SignupRequest";
import { ApiResponse } from "../_dto/response/ApiResponse";

@Component({ templateUrl: "register.component.html" })
export class RegisterComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toast: MyToastService
  ) {}

  ngOnInit(): void {
    this.authenticationService.logout();
  }

  signup(username: string, email: string, password: string) {
    this.authenticationService
      .signup(new SignupRequest(username, email, password))
      .subscribe(
        (response: ApiResponse) =>
          this.toast.successMsg(response.message, "Success"),
        (error: string) => this.toast.errorMsg(error, "Sign up")
      );
  }
}

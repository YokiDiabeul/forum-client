import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LoginRequest } from "../_dto/request/LoginRequest";
import { CurrentUser } from "../_dto/model/CurrentUser";
import { SignupRequest } from "../_dto/request/SignupRequest";
import { environment } from "./../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  url: string = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) {}

  login(usernameOrEmail: string, password: string) {
    return this.http
      .post<CurrentUser>(this.url + `/signin`, {
        usernameOrEmail,
        password,
      } as LoginRequest)
      .pipe(
        map((user) => {
          if (user && user.accessToken) {
            localStorage.setItem("currentUser", JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
  }

  signup(signupRequest: SignupRequest) {
    return this.http.post<any>(this.url + `/signup`, signupRequest);
  }
}

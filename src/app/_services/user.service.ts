import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../_dto/model/User";
import { Trophy } from "../_dto/model/Trophy";
import { environment } from "./../../environments/environment";

@Injectable({ providedIn: "root" })
export class UserService {
  private url: string = environment.apiUrl + "/users";

  constructor(private http: HttpClient) {}

  getMe() {
    return this.http.get<User>(this.url + `/me`);
  }

  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  getMyPosts() {
    return this.http.get<User[]>(this.url + `/me/posts`);
  }

  getPostCreatedBy(username: string) {
    return this.http.get<User[]>(this.url + `/${username}/posts`);
  }

  getTrophies(username: string) {
    return this.http.get<Trophy[]>(this.url + `/${username}/trophies`);
  }

  addTrophy(username: string, trophy: Trophy) {
    return this.http.post<any>(this.url + `/${username}/trophies`, trophy);
  }
}

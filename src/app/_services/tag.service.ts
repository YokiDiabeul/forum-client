import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tag } from "../_dto/model/Tag";
import { environment } from "./../../environments/environment";

@Injectable({ providedIn: "root" })
export class TagService {
  private url: string = environment.apiUrl + "/tags";

  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<Tag[]>(this.url);
  }
}

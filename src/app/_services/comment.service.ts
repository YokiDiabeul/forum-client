import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Comment } from "../_dto/model/Comment";
import { environment } from "./../../environments/environment";

@Injectable({ providedIn: "root" })
export class CommentService {
  private url: string = environment.apiUrl + "/comments";

  constructor(private http: HttpClient) {}

  addReply(id: number, comment: Comment) {
    return this.http.put<any>(this.url + `/${id}/reply`, comment);
  }

  upvote(id: number) {
    return this.http.put<any>(this.url + `/${id}/upvote`, null);
  }

  downvote(id: number) {
    return this.http.put<any>(this.url + `/${id}/downvote`, null);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "../_const/DataSource";
import { Comment } from "../_dto/model/Comment";

@Injectable({ providedIn: "root" })
export class CommentService {
  private url: string = url + "/comments";

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

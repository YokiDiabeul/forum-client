import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {url} from '../_const/DataSource';
import {Post} from '../_dto/model/Post';
import {Comment} from '../_dto/model/Comment';

@Injectable({ providedIn: 'root' })
export class PostService {

  private url: string  = url + '/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.url);
  }

  getPost(slug: string) {
    return this.http.get<Post>(this.url + `/${slug}`);
  }

  addPost(post: Post) {
    return this.http.post<any>(this.url, post);
  }

  addComment(slug: string, comment: Comment) {
    return this.http.put<any>(this.url + `/${slug}/comment`, comment);
  }

  upvote(slug: string) {
    return this.http.put<any>(this.url + `/${slug}/upvote`, null);
  }

  downvote(slug: string) {
    return this.http.put<any>(this.url + `/${slug}/downvote`, null);
  }
}

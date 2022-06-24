import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Topic } from "../_dto/model/Topic";
import { User } from "../_dto/model/User";
import { Post } from "../_dto/model/Post";
import { environment } from "./../../environments/environment";

@Injectable({ providedIn: "root" })
export class TopicService {
  private url: string = environment.apiUrl + "/topics";

  constructor(private http: HttpClient) {}

  getTopics() {
    return this.http.get<Topic[]>(this.url);
  }

  getTopic(id: number) {
    return this.http.get<Topic>(this.url + `/${id}`);
  }

  getTopicByName(name: string) {
    return this.http.get<Topic>(this.url + `/${name}/n`);
  }

  getTopicPosts(id: number) {
    return this.http.get<Post[]>(this.url + `/${id}/posts`);
  }

  getSubscribers(id: number) {
    return this.http.get<User[]>(this.url + `/${id}/subscribers`);
  }

  getModerators(id: number) {
    return this.http.get<User[]>(this.url + `/${id}/moderators`);
  }

  sub(id: number) {
    return this.http.put<any>(this.url + `/${id}/sub`, null);
  }

  unsub(id: number) {
    return this.http.put<any>(this.url + `/${id}/unsub`, null);
  }

  addTopic(topic: Topic) {
    return this.http.post<any>(this.url, topic);
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { PostService } from '../_services/post.service';
import { TopicService } from '../_services/topic.service';
import { MyToastService } from '../_services/toast.service';
import { Post } from '../_dto/model/Post';
import { Topic } from '../_dto/model/Topic';
import { ImageUtils } from '../_utils/image';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  topics: Topic[] = [];

  constructor(private userService: UserService,
              private topicService: TopicService,
              private toast: MyToastService,
              public postService: PostService,
              public iu: ImageUtils) {}

  ngOnInit() {
    this.getPosts();
    this.getTopics();
  }

  getPosts() {
    this.postService.getPosts().pipe(first()).subscribe(
        posts => this.posts = posts,
      error => this.toast.errorMsg(error, 'get posts')
      );
  }

  getTopics() {
    this.topicService.getTopics().pipe(first()).subscribe(
        topics => this.topics = topics
      );
  }

  upvote(slug: string) {
    this.postService.upvote(slug).subscribe(
      () => this.refreshPost(slug),
      error => this.toast.errorMsg(error, 'Upvote')
    );
  }

  downvote(slug: string) {
    this.postService.downvote(slug).subscribe(
      () => this.refreshPost(slug),
      error => this.toast.errorMsg(error, 'Downvote')
    );
  }

  refreshPost(slug: string) {
    const index: number = this.posts.findIndex(x => x.slug === slug);

    this.postService.getPost(slug).subscribe(
      post => this.posts[index] = post,
      error => this.toast.errorMsg(error, 'Get post')
    );
  }

  sub(id: number) {
    this.topicService.sub(id).subscribe(
      () => null,
      error => this.toast.errorMsg(error, 'Sub'),
      () => this.getTopics()
    );
  }

  unsub(id: number) {
    this.topicService.unsub(id).subscribe(
      () => null,
      error => this.toast.errorMsg(error, 'Unsub'),
      () => this.getTopics()
    );
  }
}

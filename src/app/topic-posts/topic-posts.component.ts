import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MyToastService} from '../_services/toast.service';
import {TopicService} from '../_services/topic.service';
import {Post} from '../_dto/model/Post';
import {Topic} from '../_dto/model/Topic';
import {first, switchMap} from 'rxjs/operators';
import {ImageUtils} from '../_utils/image';
import {PostService} from '../_services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: 'topic-posts.component.html',
  styleUrls: ['topic-posts.component.scss']
})
export class TopicPostsComponent implements OnInit {

  @Input() topic: Topic;
  posts: Post[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toast: MyToastService,
              private topicService: TopicService,
              private postService: PostService,
              public iu: ImageUtils) {}

  ngOnInit() {
    this.get();
  }

  get() {
    this.route.params.pipe(
      first(),
      switchMap((params: Params) => this.topicService.getTopicByName(params['name']))
    ).subscribe(
      topic => this.topic = topic,
      error => this.toast.errorMsg(error, 'Get topic'),
      () => this.getPosts(this.topic.id)
    );
  }

  getPosts(id: number) {
    this.topicService.getTopicPosts(id).subscribe(
      posts => this.posts = posts,
      error => this.toast.errorMsg(error, 'Get posts')
    );
  }

  upvote(slug: string) {
    this.postService.upvote(slug).subscribe(
      () => this.get(),
      error => this.toast.errorMsg(error, 'Upvote')
    );
  }

  downvote(slug: string) {
    this.postService.downvote(slug).subscribe(
      () => this.get(),
      error => this.toast.errorMsg(error, 'Downvote')
    );
  }

  sub(id: number) {
    this.topicService.sub(id).subscribe(
      () => null,
      error => this.toast.errorMsg(error, 'Sub'),
      () => this.get()
    );
  }

  unsub(id: number) {
    this.topicService.unsub(id).subscribe(
      () => null,
      error => this.toast.errorMsg(error, 'Unsub'),
      () => this.get()
    );
  }
}

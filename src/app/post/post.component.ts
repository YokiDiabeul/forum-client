import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { first, switchMap } from 'rxjs/operators';
import { Post } from '../_dto/model/Post';
import { Comment } from '../_dto/model/Comment';
import { MyToastService } from '../_services/toast.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../_dto/model/User';
import { UserService } from '../_services/user.service';
import { ImageUtils } from '../_utils/image';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiResponse } from '../_dto/response/ApiResponse';
import { CommentService } from '../_services/comment.service';
import { TopicService } from '../_services/topic.service';

@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  modos: User[];
  img: string;
  me: User;
  commentContent: string;
  replyContent: string;

  isLogged = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'What are your thoughts?',
    translate: 'no'
  };

  editorConfigReply: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '5rem',
    minHeight: '5rem',
    placeholder: 'What are your thoughts?',
    translate: 'no'
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toast: MyToastService,
              private commentService: CommentService,
              private userService: UserService,
              private topicService: TopicService,
              public postService: PostService,
              public iu: ImageUtils) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.isLogged = true;
      this.getMe();
    }
    this.get();
    this.img = this.iu.getImageUrl(300, 700);
  }

  get() {
    this.route.params.pipe(
      first(),
      switchMap((params: Params) => this.postService.getPost(params['slug']))
    ).subscribe(
      post => this.post = post,
      error => this.toast.errorMsg(error, 'Get post'),
      () => this.getModos(this.post.topic.id)
    );
  }

  getMe() {
    this.userService.getMe().subscribe(
      user => this.me = user
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

  comUpvote(id: number) {
    this.commentService.upvote(id).subscribe(
      () => this.get(),
      error => this.toast.errorMsg(error, 'comUpvote')
    );
  }

  comDownvote(id: number) {
    this.commentService.downvote(id).subscribe(
      () => this.get(),
      error => this.toast.errorMsg(error, 'comDownvote')
    );
  }

  addComment(): void {
    if (this.commentContent === undefined || this.commentContent === '') {
      return;
    }

    const com: Comment = new Comment();
    com.text = this.commentContent;

    this.postService.addComment(this.post.slug, com)
      .subscribe(
        (response: ApiResponse) => this.toast.successMsg(response.message, 'Success'),
        error => this.toast.errorMsg(error, 'Add Comment'),
        () => {
          this.commentContent = '';
          this.get();
        }
      );
  }

  addReply(comment: number): void {
    if (this.replyContent === undefined || this.replyContent === '') {
      return;
    }

    const rep = new Comment();
    rep.text = this.replyContent;

    this.commentService.addReply(comment, rep)
      .subscribe(
        (response: ApiResponse) => this.toast.successMsg(response.message, 'Success'),
        error => this.toast.errorMsg(error, 'Add Reply'),
        () => {
          this.replyContent = '';
          this.get();
        }
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

  getModos(id: number) {
    this.topicService.getModerators(id).subscribe(
      modos => this.modos = modos,
      error => this.toast.errorMsg(error, 'GetModos')
    );
  }

  toggleContent(id: number) {
    const contentId = document.getElementById('reply-editor-' + id);
    contentId.style.display === 'block' ? contentId.style.display = 'none' : contentId.style.display = 'block';
  }
}

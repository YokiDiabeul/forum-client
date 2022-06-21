import { Component, OnInit } from "@angular/core";
import { PostService } from "../_services/post.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { TopicService } from "../_services/topic.service";
import { Topic } from "../_dto/model/Topic";
import { Post } from "../_dto/model/Post";
import { MyToastService } from "../_services/toast.service";
import { TagService } from "../_services/tag.service";
import { Tag } from "../_dto/model/Tag";

export class Item {
  id: number;
  itemName: string;
  tag: Tag;
}

@Component({
  templateUrl: "post-create.component.html",
  styleUrls: ["post-create.component.scss"],
})
export class PostCreateComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: "25rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    // uploadUrl: 'v1/images', // if needed
    customClasses: [
      // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };

  dropdownSettings = {
    singleSelection: false,
    text: "select the tags",
    selectAllText: "Select all",
    unSelectAllText: "Select none",
    enableSearchFilter: false,
    classes: "",
  };

  model = new Post();
  topics: Topic[];
  selectedTopic: number;

  tags: Tag[];
  tagItems: Item[] = [];
  selectedTags: Item[] = [];

  constructor(
    private postService: PostService,
    private topicService: TopicService,
    private tagService: TagService,
    private toast: MyToastService
  ) {}

  ngOnInit() {
    this.getTopics();
    this.getTags();
  }

  getTopics() {
    this.topicService.getTopics().subscribe((topics) => (this.topics = topics));
  }

  getTags() {
    this.tagService.getTags().subscribe(
      (tags) => (this.tags = tags),
      (error) => this.toast.errorMsg(error, "Get Tags"),
      () => (this.tagItems = this.tags.map((t) => this.toItem(t)))
    );
  }

  addPost() {
    if (this.model.body === undefined || this.model.body === "") {
      return;
    }

    const top = new Topic();
    top.id = this.selectedTopic;

    this.model.topic = top;
    this.model.tags = this.selectedTags.map((item) => item.tag);

    console.log(this.model);

    this.postService.addPost(this.model).subscribe(
      (response) => this.toast.successMsg(response.message, "Success"),
      (error) => this.toast.errorMsg(error, "Add Article")
    );
  }

  updateTopic(top: number) {
    console.log(top);
    this.selectedTopic = top;
  }

  toItem(tag: Tag): Item {
    const i: Item = new Item();
    i.id = tag.id;
    i.itemName = tag.name;
    i.tag = tag;
    return i;
  }
}

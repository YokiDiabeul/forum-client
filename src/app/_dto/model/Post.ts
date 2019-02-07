import {Topic} from './Topic';
import {Tag} from './Tag';
import {Comment} from './Comment';

export class Post {
  id: number;
  title: string;
  slug: string;
  body: string;
  summary: string;
  topic: Topic;
  tags: Tag[];
  comments: Comment[];
  votes: number;
  voted: number;
  createdAt: string;
  createdBy: string;
  updatedBy: string;
}

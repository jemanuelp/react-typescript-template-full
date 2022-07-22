import {Comment} from './Comment';
import {Blog} from './Blog';

export type BlogDetail = {
  blog: Blog;
  comments: Comment[];
}
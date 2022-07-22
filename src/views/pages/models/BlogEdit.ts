import {BlogCategory} from './BlogCategory';

export type BlogEdit = {
  avatar: string;
  userFullName: string;
  createdTime: string;
  blogTitle: string;
  blogCategories: BlogCategory[],
  slug: string;
  status: string;
  excerpt: string;
  featuredImage: string;
}
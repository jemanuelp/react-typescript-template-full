import {BlogEdit} from './BlogEdit';
import {BlogSidebar} from './BlogSidebar';
import {BlogList} from './BlogList';
import {BlogDetail} from './BlogDetail';

export type DataBlog = {
  blogList: BlogList[];
  blogSidebar: BlogSidebar;
  blogDetail: BlogDetail;
  blogEdit: BlogEdit;
}
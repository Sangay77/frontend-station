import { PostCategory } from "./postCategory";

export interface Post {
  id: number;
  title: string;
  content: string;
  postCategory: PostCategory; // postCategory is an object
}
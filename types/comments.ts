export interface IComments {
  id: string;
  content: string;
  username: string;
  avatarUrl: string;
  userId: string;
  parentId: string;
  createdAt: string;
  like: number;
  dislike: number;
}

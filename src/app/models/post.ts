import { Comment } from 'src/app/models/comment';
import { Image } from './image';
import { User } from './user';
export class Post {
    postId: number;
    title: string;
    userId: User;
    image: Image;
    upvotes: number;
    comments: Comment[];

    constructor(
        postId: number,
        title: string,
        userId: User,
        image: Image,
        upvotes: number,
        comments: Comment[]
    ) {
        this.postId = postId
        this.title = title
        this.userId = userId
        this.image = image
        this.upvotes = upvotes
        this.comments = comments
    }
}
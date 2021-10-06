import { Image } from './image';
import { User } from './../../../../../../../target/classes/hierophant-site/src/app/models/user';
export class Post {
    postId: number;
    title: string;
    userId: User;
    image: Image;
    upvotes: number;
    comments: any[];

    constructor(
        postId: number,
        title: string,
        userId: User,
        image: Image,
        upvotes: number,
        comments: any[]
    ) {
        this.postId = postId
        this.title = title
        this.userId = userId
        this.image = image
        this.upvotes = upvotes
        this.comments = comments
    }

}
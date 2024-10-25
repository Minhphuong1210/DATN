export type User = {
    id: string;
    name: string;
    email: string;
    password: string
   
}
export type UserInput = Omit<User, ' id'>;

export type Comment = {
    id: string
    name: string
    rating: string
    comment: string
}
export type CommentInput = Omit<Comment, ' id'>
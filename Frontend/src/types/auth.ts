export type User = {
    id: string;
    email: string;
    password: string
}
export type UserInput = Omit<User, ' id'>;
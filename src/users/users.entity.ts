export enum UserStatus{
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export class User {
    id : Date
    name : string
    lastName : string
    email : string

}
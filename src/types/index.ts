export type SignUpData = {
    fullName: string,
    email: string,
    password: string
}

export type LoginData = {
    email: string,
    password: string
}

export type AuthUser = {
    _id: string,
    __v: number,
    email: string,
    fullName: string,
    profilePic: string,
    createdAt: string,
    updatedAt: string,
}

export type ChatUser = {
    _id: string,
    fullName: string,
    profilePic: string,
    email: string,
    createdAt: string,
    updatedAt: string
}
export interface UserDetails {
    name: string,
    image?: string,
    bio?: string,
    birthday?: string,
    timetableUrl?: string,
}

export type SearchedUserDetails = {
    id: string;
    name: string;
    image?: string;
    bio?: string;
    birthday?: Date;
    timetableUrl?: string;
}
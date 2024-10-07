import { Song } from "./song";

export interface User {
    id: number;
    email: string;
    password: string;
    desription: string;
    favSongs: Song[];
}
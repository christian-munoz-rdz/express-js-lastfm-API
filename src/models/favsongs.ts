import { Song } from "./song";

export interface FavSongs {
    userId: number;
    songs: Song[];
}
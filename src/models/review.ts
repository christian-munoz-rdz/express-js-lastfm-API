import { Song } from "./song";

export interface Review {
    userId: number;
    song: Song;
    comment: string;
    rating: number;
}
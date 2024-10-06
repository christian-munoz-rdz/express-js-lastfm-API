import { Song } from './song';

export interface Playlist {
    userId: number;
    playlistName: string;
    playlistDescription: string;
    songs: Song[];
}
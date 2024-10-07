import { Request, Response } from 'express';

import HttpError from "../models/errors/http-error";
import { Playlist } from '../models/playlist';

const DUMMY_Playlists: Playlist[] = [
    {
        userId: 1,
        playlistName: "Chill",
        playlistDescription: "Canciones para relajarse",
        songs: [
            {
                songName: "Feather",
                artist: "Sabrina Carpenter"
            },
            {
                songName: "End of Beginning",
                artist: "Djo"
            },
            {
                songName: "Diet Pepsi",
                artist: "Addison Rae"
            },
        ]
    },
    {
        userId: 2,
        playlistName: "Playlist 2",
        playlistDescription: "Canciones para relajarse",
        songs: [
            {
                songName: "Feather",
                artist: "Sabrina Carpenter"
            },
            {
                songName: "End of Beginning",
                artist: "Djo"
            },
            {
                songName: "Diet Pepsi",
                artist: "Addison Rae"
            },
        ]
    },
    {
        userId: 1,
        playlistName: "Playlist 3",
        playlistDescription: "Canciones para relajarse",
        songs: [
            {
                songName: "Feather",
                artist: "Sabrina Carpenter"
            },
            {
                songName: "End of Beginning",
                artist: "Djo"
            },
            {
                songName: "Diet Pepsi",
                artist: "Addison Rae"
            },
        ]
    },
    {
        userId: 3,
        playlistName: "Playlist 4",
        playlistDescription: "Canciones para relajarse",
        songs: [
            {
                songName: "Feather",
                artist: "Sabrina Carpenter"
            },
            {
                songName: "End of Beginning",
                artist: "Djo"
            },
            {
                songName: "Diet Pepsi",
                artist: "Addison Rae"
            },
        ]
    },
];

// obtener playlists de usuario
export const getPlaylists = (req: Request, res: Response, next: () => void) => {
    const userId = req.params.uid;
    const playlists = DUMMY_Playlists.filter(p => p.userId === parseInt(userId));
    res.json({ playlists });
};

// crear playlist
export const createPlaylist = (req: Request, res: Response, next: () => void) => {
    const { userId, playlistName, playlistDescription, songs } = req.body;

    const newPlaylist: Playlist = {
        userId,
        playlistName,
        playlistDescription,
        songs: songs
    };

    DUMMY_Playlists.push(newPlaylist);

    res.status(201).json({ playlist: newPlaylist });
};

// eliminar playlist
export const deletePlaylist = (req: Request, res: Response, next: () => void) => {
    const { userId, playlistName } = req.body;

    const index = DUMMY_Playlists.findIndex(p => p.userId === userId && p.playlistName === playlistName);
    if (index < 0) {
        throw new HttpError('Playlist no encontrada', 404);
    }

    DUMMY_Playlists.splice(index, 1);

    res.status(200).json({ message: 'Playlist eliminada' });
};


// agregar canción a playlist
export const addSongToPlaylist = (req: Request, res: Response, next: () => void) => {
    const { userId, playlistName, song } = req.body;

    const playlist = DUMMY_Playlists.find(p => p.userId === userId && p.playlistName === playlistName);
    if (!playlist) {
        throw new HttpError('Playlist no encontrada', 404);
    }

    playlist.songs.push(song);

    res.status(201).json({ playlist });
};

// eliminar canción de playlist
export const removeSongFromPlaylist = (req: Request, res: Response, next: () => void) => {
    const { userId, playlistName, song } = req.body;

    const playlist = DUMMY_Playlists.find(p => p.userId === userId && p.playlistName === playlistName);
    if (!playlist) {
        throw new HttpError('Playlist no encontrada', 404);
    }

    const index = playlist.songs.findIndex(s => s.songName === song.songName && s.artist === song.artist);
    if (index < 0) {
        throw new HttpError('Canción no encontrada', 404);
    }

    playlist.songs.splice(index, 1);

    res.status(200).json({ playlist });
};
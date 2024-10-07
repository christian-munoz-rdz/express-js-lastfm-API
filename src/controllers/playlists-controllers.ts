import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import HttpError from "../models/errors/http-error";
import { Playlist } from "../models/playlist";

// Definir la ruta al archivo JSON
const playlistsFilePath = path.join(__dirname, "..", "data", "playlists.json");

// Función para leer el archivo JSON
const readPlaylistsFromFile = (): Playlist[] => {
  const fileData = fs.readFileSync(playlistsFilePath, "utf-8");
  return JSON.parse(fileData);
};

// Función para escribir en el archivo JSON
const writePlaylistsToFile = (playlists: Playlist[]) => {
  fs.writeFileSync(
    playlistsFilePath,
    JSON.stringify(playlists, null, 2),
    "utf-8"
  );
};

// obtener playlists de usuario
export const getPlaylists = (req: Request, res: Response, next: () => void) => {
  const { userId } = req.body;
  const playlists = readPlaylistsFromFile();
  const userPlaylists = playlists.filter((p) => p.userId === parseInt(userId));

  res.json({ playlists: userPlaylists });
};

// crear playlist
export const createPlaylist = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { userId, playlistName, playlistDescription, songs } = req.body;

  const playlists = readPlaylistsFromFile();

  const newPlaylist: Playlist = {
    userId,
    playlistName,
    playlistDescription,
    songs: songs,
  };

  playlists.push(newPlaylist);
  writePlaylistsToFile(playlists);

  res.status(201).json({ playlist: newPlaylist });
};

// eliminar playlist
export const deletePlaylist = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { userId, playlistName } = req.body;

  const playlists = readPlaylistsFromFile();
  const index = playlists.findIndex(
    (p) => p.userId === userId && p.playlistName === playlistName
  );

  if (index < 0) {
    throw new HttpError("Playlist no encontrada", 404);
  }

  playlists.splice(index, 1);
  writePlaylistsToFile(playlists);

  res.status(200).json({ message: "Playlist eliminada" });
};

// agregar canción a playlist
export const addSongToPlaylist = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { userId, playlistName, song } = req.body;

  const playlists = readPlaylistsFromFile();

  const playlist = playlists.find(
    (p) => p.userId === userId && p.playlistName === playlistName
  );

  if (!playlist) {
    throw new HttpError("Playlist no encontrada", 404);
  }

  playlist.songs.push(song);
  
  playlists.splice(
    playlists.findIndex(
      (p) => p.userId === userId && p.playlistName === playlistName
    ),
    1,
    playlist
  );

    writePlaylistsToFile(playlists);

  res.status(201).json({ message: "Cancion Agregada" });
};

// eliminar canción de playlist
export const removeSongFromPlaylist = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { userId, playlistName, song } = req.body;

  const playlists = readPlaylistsFromFile();

  const playlist = playlists.find(p => p.userId === userId && p.playlistName === playlistName);
  
  if (!playlist) {
    throw new HttpError("Playlist no encontrada", 404);
  }

  const index = playlist.songs.findIndex(
    (s) => s.songName === song.songName && s.artist === song.artist
  );
  if (index < 0) {
    throw new HttpError("Canción no encontrada", 404);
  }

  playlist.songs.splice(index, 1);

  playlists.splice(
    playlists.findIndex(
      (p) => p.userId === userId && p.playlistName === playlistName
    ),
    1,
    playlist
  );
    
  writePlaylistsToFile(playlists);


  res.status(200).json({ message: "Canción eliminada" });
};

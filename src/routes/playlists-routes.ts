import express from 'express';
import { addSongToPlaylist, 
    createPlaylist, 
    deletePlaylist, 
    getPlaylists, 
    removeSongFromPlaylist } from '../controllers/playlists-controllers';

const playlistsRouter = express.Router();

// Obtener playlists de usuario
playlistsRouter.get('/:uid', getPlaylists);

// Crear playlist
playlistsRouter.post('/create', createPlaylist);

// Eliminar playlist
playlistsRouter.delete('/delete', deletePlaylist);

// Agregar canción a playlist
playlistsRouter.patch('/add-song', addSongToPlaylist);

// Eliminar canción de playlist
playlistsRouter.patch('/remove-song', removeSongFromPlaylist);


export default playlistsRouter;
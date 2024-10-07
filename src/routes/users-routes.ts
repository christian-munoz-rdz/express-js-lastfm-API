import express from 'express';
import {check } from 'express-validator';

import { addSongToFav, editDescription, 
    getUserData,
    getUsers, 
    login, 
    signup } from '../controllers/users-controllers';

const usersRouter = express.Router();

// Obtener todos los usuarios
usersRouter.get('/', getUsers);

// signup de usuario

usersRouter.post('/signup',
    [
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min: 6})
    ],
    signup);

// login de usuario
usersRouter.post('/login', login);

// Obtener datos de usuario
usersRouter.post('/user-data', getUserData);

//editar descripción de usuario
usersRouter.patch('/description', editDescription);

// Agregar canción a favoritos
usersRouter.patch('/fav-song', addSongToFav);

export default usersRouter;
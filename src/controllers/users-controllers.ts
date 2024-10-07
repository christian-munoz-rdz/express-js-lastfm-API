import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import HttpError from "../models/errors/http-error";
import { User } from "../models/user";

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const readUsersFromFile = (): User[] => {
    const fileData = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(fileData);
};

// Función para escribir en el archivo JSON
const writeUsersToFile = (users: User[]) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

// obtener usuarios
export const getUsers = (req: Request, res: Response, next: () => void) => {
    const users = readUsersFromFile();
    res.json({users: users});
};

// signup de usuario
export const signup = (req: Request, res: Response, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Datos inválidos', 422);
    }
    const { email, password } = req.body;

    const users = readUsersFromFile();
    const hasUser = users.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('El usuario ya existe', 422);
    }

    const newUser: User = {
        id: users.length + 1,
        email,
        password,
        desription: '',
        favSongs: []
    };

    users.push(newUser);
    writeUsersToFile(users);

    res.status(201).json({user: newUser});
};

// login de usuario
export const login = (req: Request, res: Response, next: () => void) => {

    const { email, password } = req.body;

    const users = readUsersFromFile();

    const identifiedUser = users.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Credenciales inválidas', 401);
    }

    res.json({message: 'Logged in', userId: identifiedUser.id});
};

// Obtener datos del usuario
export const getUserData = (req: Request, res: Response, next: () => void) => {

    const { userId } = req.body;

    const users = readUsersFromFile();

    const user = users.find(u => u.id === Number(userId));

    if (!user) {
        throw new HttpError('Usuario no encontrado', 404);
    }

    res.json({user});
};

//editar descripción de usuario
export const editDescription = (req: Request, res: Response, next: () => void) => {
    const { userId, description } = req.body;

    const users = readUsersFromFile();

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        throw new HttpError('Usuario no encontrado', 404);
    }

    // Reemplazar el usuario en el arreglo
    users[userIndex].desription = description;
    writeUsersToFile(users);

    res.json({message: 'Descripción actualizada'});
};


// Agregar canción a favoritos

export const addSongToFav = (req: Request, res: Response, next: () => void) => {
    const { userId, song } = req.body;

    const users = readUsersFromFile();

    const userIndex = users.findIndex(u => u.id === userId); 
    if (userIndex === -1) {
        throw new HttpError('Usuario no encontrado', 404);
    }

    users[userIndex].favSongs.push(song);
    writeUsersToFile(users);

    res.json({message: 'Canción agregada a favoritos'});
};

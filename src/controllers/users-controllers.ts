import { validationResult } from "express-validator";
import { Request, Response } from 'express';

import HttpError from "../models/errors/http-error";
import { User } from "../models/user";

const DUMMY_USERS: User[] = [
  {
    id: 1,
    email: "chgeovany.15@gmail.com",
    password: "chr1234",
    desription: "Hola a todos, soy Geovany y me encanta la música",
    favSongs: [
        {
            songName: "Feather",
            artist: "Sabrina Carpenter",
        },
        {
            songName: "Father Stretch My Hands Pt. 1",
            artist: "Kanye West",
        },
        {
            songName: "Why'd You Only Call Me When You're High?",
            artist: "Arctic Monkeys",
        },
        {
            songName: "End of Beginning",
            artist: "Djo",
        },
        {
            songName: "Diet Pepsi",
            artist: "Addison Rae",
        },
        {
            songName: "No Surprises",
            artist: "Radiohead",
        },
        {
            songName: "Not Allowed",
            artist: "TV Girl",
        },
        {
            songName: "Apocalypse",
            artist: "Cigarettes After Sex",
        },
        {
            songName: "Thinkin Bout You",
            artist: "Frank Ocean",
        },
        {
            songName: "Ivy",
            artist: "Frank Ocean",
        },
        {
            songName: "BEST INTEREST",
            artist: "Tyler, the Creator",
        },
    ]
    },
    {
        id: 2,
        email: "christian.munoz5060@alumnos.udg.mx",
        password: "chr321",
        desription: "",
        favSongs: [
            {
                songName: "Sympathy is a knife",
                artist: "Charli XCX",
            },
            {
                songName: "Flashing Lights",
                artist: "Kanye West",
            },
            {
                songName: "Disco",
                artist: "Surf Curse",
            },
            {
                songName: "Faint",
                artist: "Linkin Park",
            },
            {
                songName: "Fade Into You",
                artist: "Mazzy Star",
            },
            {
                songName: "In the End",
                artist: "Linkin Park",
            },
            {
                songName: "Girl, so confusing",
                artist: "Charli XCX",
            },
            {
                songName: "Money Trees",
                artist: "Kendrick Lamar",
            },
            {
                songName: "Dancing in the Flames",
                artist: "The Weeknd",
            },
            {
                songName: "There Is a Light That Never Goes Out - 2011 Remaster",
                artist: "The Smiths",
            },
            {
                songName: "PRIDE.",
                artist: "Kendrick Lamar",
            },
        ]
    },
];

// obtener usuarios
export const getUsers = (req: Request, res: Response, next: () => void) => {
    res.json({users: DUMMY_USERS});
};

// signup de usuario
export const signup = (req: Request, res: Response, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Datos inválidos', 422);
    }
    const { email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('El usuario ya existe', 422);
    }

    const newUser: User = {
        id: DUMMY_USERS.length + 1,
        email,
        password,
        desription: '',
        favSongs: []
    };

    DUMMY_USERS.push(newUser);

    res.status(201).json({user: newUser});
};

// login de usuario
export const login = (req: Request, res: Response, next: () => void) => {

    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Credenciales inválidas', 401);
    }

    res.json({message: 'Logged in', userId: identifiedUser.id});
};

// Obtener datos del usuario
export const getUserData = (req: Request, res: Response, next: () => void) => {

    const userId = req.body.userId;

    const user = DUMMY_USERS.find(u => u.id === Number(userId));

    if (!user) {
        throw new HttpError('Usuario no encontrado', 404);
    }

    res.json({user});
};

//editar descripción de usuario
export const editDescription = (req: Request, res: Response, next: () => void) => {
    const { userId, description } = req.body;

    const user = DUMMY_USERS.find(u => u.id === userId);
    if (!user) {
        throw new HttpError('Usuario no encontrado', 404);
    }

    user.desription = description;

    // Reemplazar el usuario en el arreglo
    const index = DUMMY_USERS.findIndex(u => u.id === userId);
    DUMMY_USERS[index] = user;

    res.json({message: 'Descripción actualizada'});
};


// Agregar canción a favoritos

export const addSongToFav = (req: Request, res: Response, next: () => void) => {
    const { userId, song } = req.body;

    const user = DUMMY_USERS.find(u => u.id === userId);
    if (!user) {
        throw new HttpError('Usuario no encontrado', 404);
    }

    user.favSongs.push(song);

    // Reemplazar el usuario en el arreglo
    const index = DUMMY_USERS.findIndex(u => u.id === userId);
    DUMMY_USERS[index] = user;

    res.json({message: 'Canción agregada a favoritos'});
};

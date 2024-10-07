import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';

import HttpError from "../models/errors/http-error";
import { Review } from "../models/review";

// Definir la ruta al archivo JSON
const reviewsFilePath = path.join(__dirname, '..', 'data', 'reviews.json');

// Función para leer el archivo JSON
const readReviewsFromFile = (): Review[] => {
  const fileData = fs.readFileSync(reviewsFilePath, 'utf-8');
  return JSON.parse(fileData);
};

// Función para escribir en el archivo JSON
const writeReviewsToFile = (reviews: Review[]) => {
  fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf-8');
};

const DUMMY_REVIEWS: Review[] = [
  {
    userId: 1,
    song: {
      songName: "Father Stretch My Hands Pt. 1",
      artist: "Kanye West",
    },
    comment: " What a great song!",
    rating: 1,
  },
  {
    userId: 2,
    song: {
      songName: "Not Allowed",
      artist: "TV Girl",
    },
    comment: "I love this song! since I was a child",
    rating: 2,
  },
  {
    userId: 3,
    song: {
      songName: "BEST INTEREST",
      artist: "Tyler, the Creator",
    },
    comment: "No way! this song is amazing",
    rating: 3,
  },
  {
    userId: 1,
    song: {
      songName: "Sympathy is a knife",
      artist: "Charli XCX",
    },
    comment: "I can't stop listening to this song",
    rating: 4,
  },
];

// Obtener reviews de usuario
export const getReviews = (req: Request, res: Response, next: () => void) => {
  
  const { userId } = req.body

  const reviews = readReviewsFromFile();
  const userReviews = reviews.filter((r) => r.userId === parseInt(userId));
  console.log(userReviews)

  res.json({ reviews: userReviews });
};

// Crear review
export const createReview = (req: Request, res: Response, next: () => void) => {
  const { userId, song, comment, rating } = req.body;

  const reviews = readReviewsFromFile();

  const newReview: Review = {
    userId,
    song,
    comment,
    rating,
  };

  reviews.push(newReview);
  writeReviewsToFile(reviews);

  res.status(201).json({ message: "Review creada", review: newReview });
};

// Eliminar review
export const deleteReview = (req: Request, res: Response, next: () => void) => {
  const { userId, song } = req.body;

  const reviews = readReviewsFromFile();

  const index = reviews.findIndex(
    (r) =>
      r.userId === userId &&
      r.song.songName === song.songName &&
      r.song.artist === song.artist
  );

  if (index < 0) {
    throw new HttpError("Review no encontrada", 404);
  }

  reviews.splice(index, 1);
  writeReviewsToFile(reviews);

  res.status(200).json({ message: "Review eliminada" });
};

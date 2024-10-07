import { Request, Response } from "express";

import HttpError from "../models/errors/http-error";
import { Review } from "../models/review";

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
    userId: 1,
    song: {
      songName: "Not Allowed",
      artist: "TV Girl",
    },
    comment: "I love this song! since I was a child",
    rating: 2,
  },
  {
    userId: 1,
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
  const userId = req.params.userId;
  const reviews = DUMMY_REVIEWS.filter((r) => r.userId === parseInt(userId));
  res.json({ reviews });
};

// Crear review
export const createReview = (req: Request, res: Response, next: () => void) => {
  const { userId, song, comment, rating } = req.body;

  const newReview: Review = {
    userId,
    song,
    comment,
    rating,
  };

  DUMMY_REVIEWS.push(newReview);

  res.status(201).json({ review: newReview });
};

// Eliminar review
export const deleteReview = (req: Request, res: Response, next: () => void) => {
  const { userId, song } = req.body;

  const index = DUMMY_REVIEWS.findIndex(
    (r) =>
      r.userId === userId &&
      r.song.songName === song.songName &&
      r.song.artist === song.artist
  );
  if (index < 0) {
    throw new HttpError("Review no encontrada", 404);
  }

  DUMMY_REVIEWS.splice(index, 1);

  res.status(200).json({ message: "Review eliminada" });
};

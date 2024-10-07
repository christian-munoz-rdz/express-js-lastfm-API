import express from 'express';
import { createReview, deleteReview, getReviews } from '../controllers/reviews-controllers';


const reviewsRouter = express.Router();

// Obtener reviews de usuario
reviewsRouter.post('/', getReviews);

// Crear review
reviewsRouter.post('/create', createReview);

// Eliminar review
reviewsRouter.delete('/delete', deleteReview);


export default reviewsRouter;

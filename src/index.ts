import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import usersRoutes from './routes/users-routes';
import playlistsRoutes from './routes/playlists-routes';
import reviewsRoutes from './routes/reviews-routes';
import HttpError from './models/errors/http-error';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/playlists', playlistsRoutes);
app.use('/api/reviews', reviewsRoutes);

app.use((req: Request, res: Response, next) => {
  const error = new HttpError('No se encontró la ruta', 404);
  throw error;
});

app.use((error: HttpError, req: Request, res: Response, next: (arg0: HttpError) => void | Promise<void>) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'Ocurrió un error desconocido' });
}
);


app.listen(3000);
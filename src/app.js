import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

export function createApp() {
  // 1. Create Express app
  const app = express();

  // 2. Parse JSON request bodies
  app.use(express.json());

  // 3. Health check route
  app.get('/health', (req, res) => {
    res.json({ ok: true });
  });

  // 4. Auth routes
  app.use('/api/auth', authRoutes);
  

  // 5. User routes
  app.use('/api/users', userRoutes);

  // 6. Not Found middleware
  app.use(notFound);

  // 7. Error Handler middleware (ALWAYS LAST)
  app.use(errorHandler);

  // 8. Return app
  return app;
}
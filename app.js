import express from 'express';
import authRoutes from './routes/auth.rout.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res, err) => {
  if(err) { 
    console.error(err);
    return res.status(500).json('Internal Server Error');
  }
  res.status(403).json('Forbidden');
});


export default app;
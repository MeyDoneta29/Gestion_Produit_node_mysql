import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import authRoutes from './routes/auth.rout.js';
import categoryRoutes from './routes/category.rout.js';
import productRoutes from './routes/product.rout.js';

const app = express();
//XSS, CSRF, Clickjacking, etc. protection
app.use(helmet());
//Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
//CORS
app.use(cors({
  origin: 'http://localhost:3000', // allow only this origin
}));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json('Internal Server Error');
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

app.get('/', (req, res, err) => {
  if(err) { 
    console.error(err);
    return res.status(500).json('Internal Server Error');
  }
  res.status(403).json('Forbidden');
});


export default app;
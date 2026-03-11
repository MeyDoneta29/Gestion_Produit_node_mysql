import app from './app.js';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';

dotenv.config();

sequelize.sync({force: false})
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });




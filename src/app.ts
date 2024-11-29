import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from './models/user';
import userRoute from './routes/userRoute';

dotenv.config();

const app = express();
const PORT = 3334;

const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.DATABASE_USERNAME!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT), 
    dialect: 'mysql', 
  }
);

sequelize.authenticate()
.then(() => {
  console.log('Banco de dados sincronizado!');
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});


User.initialize(sequelize);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', userRoute)

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});

export default app
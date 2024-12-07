import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import User from './models/user';
import Product from './models/product';

import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'

import {Models} from '../src/types/models'
import Order from './models/order';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


User.initialize(sequelize);
Order.initialize(sequelize)
Product.initialize(sequelize)

const models: Models = {
  User: User,
  Order: Order,
}

User.associate(models)
Order.associate(models)


sequelize.authenticate()
.then(() => {
  console.log('Banco de dados sincronizado!');
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

app.use('/users', userRoute)
app.use('/product', productRoute)
app.use('/order', orderRoute)

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});

export default app
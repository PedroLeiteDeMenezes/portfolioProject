 import { Sequelize } from 'sequelize'; 
import databaseConfig from '../config/database'

const connection = new Sequelize(databaseConfig)

const models: any[] = []

models.forEach((model) => {
  if(model.associate){
    model.associate(models)
  }
})

export {connection, models}
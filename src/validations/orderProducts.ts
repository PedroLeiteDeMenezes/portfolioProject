import Order from '../models/order';
import Product from '../models/product';

export default class validateOrderProducts{
  async createOrderProduct(data: any, orderId: number, productId:number): Promise<any>{

    const orderExists = await Order.findOne({ where: { id: orderId } });
    console.log(orderExists);
    if (!orderExists) {
      throw new Error('Pedido com esse id não existe na base de dados');
    }

    const productExists = await Product.findOne({ where: { id: productId } });
    console.log(productExists);
    if (!productExists) {
      throw new Error('Produto com esse id não existe na base de dados');
    }

    if(!data.quantity || typeof data.quantity !== 'number' || isNaN(data.quantity) || data.quantity <= 0 || data.quantity > 100){
      throw new Error('Quantidade inferida está incorreta')
    }

    if (!data.price || typeof data.price !== 'number' || isNaN(data.price) || data.price <= 0 || data.price > 100000) {
      throw new Error('Preço informado está incorreto. Deve ser um número entre 1 e 100000.');
    }

    const total = data.price * data.quantity;
    if(total <= 0){
      throw new Error('O total calculado esta invalido')
    }
  }
}
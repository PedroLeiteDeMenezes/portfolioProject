import { Router } from 'express';

import OrderProductController from '../controllers/orderProductController';

//middlewares
import loginRequired from '../middlewares/loginRequired';
import { checkUserPermission } from '../middlewares/checkUserPermission';

const router = Router()

router.post('/:productId/:orderId', loginRequired.required, OrderProductController.post)

export default router
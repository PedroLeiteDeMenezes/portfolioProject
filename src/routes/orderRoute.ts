import { Router } from 'express';

import OrderController from '../controllers/orderController';

//middlewares
import loginRequired from '../middlewares/loginRequired';
import { checkUserPermission } from '../middlewares/checkUserPermission';

const router = Router()

router.post('/', loginRequired.required, OrderController.post)

export default router
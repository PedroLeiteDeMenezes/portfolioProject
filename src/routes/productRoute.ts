import { Router } from 'express';

import ProductController from '../controllers/productController'

//middlewares
import loginRequired from '../middlewares/loginRequired';
import { checkUserPermission } from '../middlewares/checkUserPermission';

const router = Router()

router.post('/', loginRequired.required, checkUserPermission.checkEditProduct ,ProductController.post)
router.get('/', loginRequired.required, checkUserPermission.checkEditProduct, ProductController.getAll)

export default router
import { Router } from 'express';

import ProductController from '../controllers/productController'

//middlewares
import loginRequired from '../middlewares/loginRequired';
import { checkUserPermission } from '../middlewares/checkUserPermission';

const router = Router()

router.post('/', loginRequired.required, checkUserPermission.checkEditProduct ,ProductController.post)
router.get('/', loginRequired.required, checkUserPermission.checkEditProduct, ProductController.getAll)
router.put('/:id', loginRequired.required, checkUserPermission.check, ProductController.put)
router.delete('/:id',  loginRequired.required, checkUserPermission.check, ProductController.delete)
router.get('/:id', loginRequired.required, checkUserPermission.check, ProductController.getId)
export default router
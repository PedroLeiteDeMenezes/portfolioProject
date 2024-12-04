import { Router } from 'express';

import ProductController from '../controllers/productController'

const router = Router()

router.post('/', ProductController.post)

export default router
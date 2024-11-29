import { Router } from 'express';


import Post from '../controllers/userController'
import getAll from '../controllers/userController';


const router = Router()

router.post('/', Post.post)
router.get('/', getAll.getAll)

export default router
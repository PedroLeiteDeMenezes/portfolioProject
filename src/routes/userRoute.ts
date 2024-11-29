import { Router } from 'express';


import Post from '../controllers/userController'


const router = Router()

router.post('/', Post.post)

export default router
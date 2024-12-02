import { Router } from 'express';


import Post from '../controllers/userController'
import getAll from '../controllers/userController';
import login from '../controllers/userController'


const router = Router()

router.post('/', Post.post)
router.get('/', getAll.getAll)
router.post('/login', login.login)

export default router
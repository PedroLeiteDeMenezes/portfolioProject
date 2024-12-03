import { Router } from 'express';

import Post from '../controllers/userController'
import getAll from '../controllers/userController';
import login from '../controllers/userController'
import deleted from '../controllers/userController'
import getId from '../controllers/userController'
import update from '../controllers/userController'

import loginRequired from '../middlewares/loginRequired';
import { checkUserPermission } from '../middlewares/checkUserPermission';


const router = Router()

router.post('/', Post.post)
router.get('/', getAll.getAll)
router.post('/login', login.login)
router.delete('/:id', loginRequired.required, checkUserPermission.check, deleted.delete)
router.get('/:id', loginRequired.required, getId.getId)
router.put('/:id', loginRequired.required, checkUserPermission.check, update.put)

export default router